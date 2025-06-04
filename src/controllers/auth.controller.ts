import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"; // Untuk hashing password
import User, { IUser } from "../models/User.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env";

interface GenericPostBody {
  [key: string]: any; // Terima objek JSON apapun
}

interface RegisterRequestBody {
  username?: string;
  email?: string;
  password?: string;
  // Tambahkan field lain jika ada, misal: namaLengkap, dll.
}

interface LoginRequestBody {
  email?: string;
  password?: string;
}

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>, // Gunakan RegisterRequestBody
  res: Response,
  next: NextFunction // Tambahkan next untuk error handling
) => {
  console.log(
    `--- CONTROLLER: REGISTER FUNCTION ACCESSED at ${new Date().toISOString()} ---`
  );
  try {
    const { username, email, password } = req.body;

    // 1. Validasi Input Dasar (Pastikan field yang dibutuhkan ada)
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Nama pengguna, email, dan password wajib diisi.",
      });
    }

    // (Opsional) Anda bisa menambahkan validasi yang lebih kompleks di sini jika diperlukan,
    // misalnya panjang minimal password, format email (meskipun sebagian sudah dihandle oleh skema).

    // 2. Cek apakah email atau username sudah ada (Mongoose akan error jika unique, tapi ini lebih user-friendly)
    // Pengecekan ini bisa dilakukan jika Anda ingin pesan error yang lebih spesifik sebelum mencoba save
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({
        // 409 Conflict
        success: false,
        message: "Email sudah terdaftar. Silakan gunakan email lain.",
      });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(409).json({
        success: false,
        message:
          "Nama pengguna sudah digunakan. Silakan pilih nama pengguna lain.",
      });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10); // Generate salt, 10 adalah cost factor yang umum
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Buat User Baru
    const newUser = new User({
      username,
      email,
      password_hash: hashedPassword, // Simpan password yang sudah di-hash
    });

    // 5. Simpan User ke Database
    const savedUser = await newUser.save();

    // 6. Kirim Respons Sukses
    // Sebaiknya jangan kirim password_hash kembali ke client
    res.status(201).json({
      // 201 Created
      success: true,
      message: "Registrasi berhasil!",
      data: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
    });
  } catch (error: any) {
    // Tangani error dari Mongoose (misalnya, validasi skema gagal) atau error lainnya
    console.error("Error saat registrasi:", error);

    // Cek jika error adalah karena duplikasi (unique constraint)
    // Kode error 11000/11001 adalah untuk duplicate key di MongoDB
    if (error.code === 11000 || error.code === 11001) {
      // Ambil field yang menyebabkan duplikasi dari pesan error
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        // 409 Conflict
        success: false,
        message: `Registrasi gagal. ${
          field.charAt(0).toUpperCase() + field.slice(1)
        } '${error.keyValue[field]}' sudah ada.`,
      });
    }

    // Cek error validasi dari Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );
      return res.status(400).json({
        success: false,
        message: "Data tidak valid.",
        errors: messages,
      });
    }

    // Gunakan middleware error global untuk error lainnya
    next(error);
  }
};
export const login = async (
  req: Request<{}, {}, LoginRequestBody>, // Gunakan LoginRequestBody
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi Input Dasar
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi.",
      });
    }

    // 2. Cari User Berdasarkan Email
    // Kita perlu mengambil password_hash untuk perbandingan, jadi jangan di-exclude
    const user = await User.findOne({ email }).select("+password_hash"); // Pastikan password_hash diambil

    if (!user) {
      return res.status(401).json({
        // 401 Unauthorized
        success: false,
        message: "Login gagal. Kredensial tidak valid.", // Pesan generik untuk keamanan
      });
    }

    // 3. Bandingkan Password
    // Pastikan user.password_hash ada sebelum membandingkan
    if (!user.password_hash) {
      // Ini seharusnya tidak terjadi jika registrasi menyimpan hash dengan benar
      console.error(
        "Error: password_hash tidak ditemukan untuk user:",
        user.email
      );
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan internal server.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        // 401 Unauthorized
        success: false,
        message: "Login gagal. Kredensial tidak valid.", // Pesan generik
      });
    }

    // BARU: Pastikan JWT_SECRET ada
    if (!JWT_SECRET) {
      console.error("Error: JWT_SECRET tidak terdefinisi.");
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan konfigurasi pada server.",
      });
    }

    // BARU: Siapkan payload untuk token
    const payload = {
      userId: user._id,
      username: user.username,
    };
    const token = jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: "1h" } // Token akan kedaluwarsa dalam 1 jam
    );

    // 4. Login Berhasil
    // TODO: Buat dan kirim JWT (JSON Web Token) di sini untuk sesi pengguna

    // Untuk saat ini, kirim respons sukses dengan data pengguna (tanpa password_hash)
    res.status(200).json({
      success: true,
      message: "Login berhasil!",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token: token, // BARU: Kirim token yang baru dibuat
    });
  } catch (error: any) {
    console.error("Error saat login:", error);
    // Gunakan middleware error global untuk error tak terduga lainnya
    next(error);
  }
};
