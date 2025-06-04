// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env"; // Impor JWT_SECRET dari konfigurasi env Anda

// BARU: Memperluas interface Request dari Express
// Ini adalah praktik yang baik di TypeScript untuk memberitahu kompiler
// bahwa objek 'req' kita sekarang mungkin memiliki properti 'user'.
declare global {
  namespace Express {
    interface Request {
      user?: {
        // Properti 'user' bisa jadi undefined jika otentikasi gagal
        userId: string;
        username: string;
        // Anda bisa menambahkan tipe lain di sini jika ada di payload token Anda
      };
    }
  }
}

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction // Fungsi untuk melanjutkan ke handler berikutnya
) => {
  console.log(
    `--- MIDDLEWARE: PROTECTROUTE ACCESSED at ${new Date().toISOString()} ---`
  );
  let token;

  // 1. Ambil token dari header Authorization
  // Klien diharapkan mengirim token dengan format "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Ambil bagian token setelah "Bearer "
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      // Ini jarang terjadi jika header ada dan dimulai dengan "Bearer "
      // Tapi sebagai tindakan pencegahan:
      console.error("Error mem-parsing token dari header:", error);
      return res.status(401).json({
        // 401 Unauthorized
        success: false,
        message: "Format token tidak valid.",
      });
    }
  }

  // 2. Jika tidak ada token yang ditemukan
  if (!token) {
    return res.status(401).json({
      // 401 Unauthorized
      success: false,
      message: "Akses ditolak. Token tidak disediakan.",
    });
  }

  // 3. Verifikasi token
  try {
    // Pastikan JWT_SECRET ada sebelum melakukan verifikasi
    if (!JWT_SECRET) {
      console.error(
        "Error: JWT_SECRET tidak terdefinisi untuk verifikasi token."
      );
      // Ini adalah masalah konfigurasi server
      return res.status(500).json({
        success: false,
        message: "Kesalahan konfigurasi pada server (verifikasi token).",
      });
    }

    // jwt.verify() akan mendekode token.
    // Jika token valid (tanda tangan cocok dan belum kedaluwarsa),
    // ia akan mengembalikan payload yang telah didekode.
    // Jika tidak valid, ia akan melempar (throw) sebuah error.
    const decodedPayload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
      iat: number; // Ditambahkan otomatis oleh jwt.sign: Issued At (waktu token dibuat)
      exp: number; // Ditambahkan otomatis oleh jwt.sign: Expiration Time (waktu token kedaluwarsa)
    };

    // 4. Jika token valid, tambahkan payload yang telah didekode ke objek 'req'
    // Ini membuat data pengguna tersedia untuk controller/route handler berikutnya.
    req.user = {
      userId: decodedPayload.userId,
      username: decodedPayload.username,
    };

    console.log(
      "Token berhasil diverifikasi, pengguna terautentikasi:",
      req.user
    );

    // Lanjutkan ke middleware atau route handler berikutnya dalam rantai
    next();
  } catch (error: any) {
    console.error("Error saat verifikasi token:", error.message);

    // Tangani error spesifik dari jsonwebtoken untuk respons yang lebih baik
    if (error.name === "JsonWebTokenError") {
      // Ini bisa terjadi jika token diubah atau JWT_SECRET tidak cocok
      return res.status(401).json({
        success: false,
        message: "Token tidak valid.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token sudah kedaluwarsa. Silakan login kembali.",
      });
    }

    // Untuk error lainnya yang mungkin terjadi saat verifikasi
    return res.status(401).json({
      // Default ke 401 jika ada error verifikasi lain
      success: false,
      message: "Gagal mengautentikasi token.",
    });
  }
};
