// src/routes/user.routes.ts
import { Router } from "express";
// BARU: Impor middleware protectRoute yang sudah kita buat
import { protectRoute } from "../middleware/auth.middleware";
// BARU: Impor controller yang baru saja kita buat
import { getUserProfile } from "../controllers/user.controller";

const router = Router();

// BARU: Terapkan middleware 'protectRoute' pada endpoint ini
// Cara kerjanya:
// 1. Permintaan ke GET /api/users/profile diterima.
// 2. Express menjalankan middleware 'protectRoute'.
// 3. Jika 'protectRoute' memverifikasi token dan memanggil next(), maka 'getUserProfile' akan dijalankan.
// 4. Jika 'protectRoute' mengirim respons error (misalnya, token tidak ada/tidak valid),
//    maka 'getUserProfile' TIDAK akan dijalankan.
router.get(
  "/profile", // Path untuk endpoint ini akan menjadi /api/users/profile (karena prefix di index.ts)
  protectRoute, // Middleware untuk melindungi route ini
  getUserProfile // Controller yang akan menangani permintaan jika token valid
);

// Anda bisa menambahkan route lain terkait pengguna di sini.
// Contoh:
// router.put("/profile", protectRoute, updateUserProfile); // Untuk update profil

export default router;
