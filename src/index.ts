// src/index.ts
import express, { Request, Response, NextFunction, Application } from "express";
import authRoutes from "./routes/auth.routes"; // Pastikan path ini benar sesuai struktur foldermu
import { startServer } from "./utils/database";

// --- Konfigurasi Aplikasi ---
async function init() {
  try {
    const result = await startServer();

    console.log("database status:", result);
    const PORT = process.env.PORT || 3000;

    const app = express();

    // --- Middleware ---
    // 1. Middleware Bawaan Express
    app.use(express.json()); // Untuk mem-parsing request body JSON
    app.use(express.urlencoded({ extended: true })); // Untuk mem-parsing request body dari form URL-encoded

    // 2. Menggunakan Routes Aplikasi
    app.use("/api/auth", authRoutes); // Semua request ke '/api/auth' ditangani oleh authRoutes

    // --- Routes Dasar ---
    // Contoh route dasar untuk mengecek apakah server berjalan
    app.get("/", (req: Request, res: Response) => {
      res.send("Selamat datang di API Proyek Web!");
    });

    // --- Penanganan Error Global ---
    // Middleware ini akan menangkap semua error yang dilempar menggunakan next(error)
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error("--- TERJADI ERROR GLOBAL ---");
      console.error("Nama Error:", err.name);
      console.error("Pesan Error:", err.message);
      if (process.env.NODE_ENV === "development") {
        console.error("Stack Trace:", err.stack); // Tampilkan stack trace hanya di development
      }

      const statusCode = (err as any).statusCode || 500;
      const message = err.message || "Terjadi kesalahan pada server.";

      res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
    });

    app.listen(() => {
      // (5) Ubah pesan log server
      console.log(
        `Server berjalan dengan sukses di http://localhost:${PORT} dan terhubung ke MongoDB.`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

init();
