// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/User.model"; // Impor model User Anda

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `--- CONTROLLER: GETUSERPROFILE ACCESSED at ${new Date().toISOString()} ---`
  );
  try {
    // Middleware 'protectRoute' seharusnya sudah mengisi req.user jika token valid
    if (!req.user || !req.user.userId) {
      // Pemeriksaan ini sebagai lapisan tambahan,
      // meskipun 'protectRoute' seharusnya sudah menangani kasus pengguna tidak terautentikasi.
      return res.status(401).json({
        success: false,
        message: "Pengguna tidak terautentikasi dengan benar.",
      });
    }

    // Temukan pengguna di database berdasarkan userId yang ada di token (dari req.user)
    // Kita tidak ingin mengirimkan password_hash kembali ke klien
    const user = await User.findById(req.user.userId).select("-password_hash");

    if (!user) {
      return res.status(404).json({
        // 404 Not Found
        success: false,
        message: "Pengguna tidak ditemukan.",
      });
    }

    // Kirim data profil pengguna
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error saat mengambil profil pengguna:", error);
    next(error); // Teruskan error ke middleware error handling global
  }
};
