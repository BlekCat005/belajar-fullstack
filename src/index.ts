// src/index.ts
import express, { Request, Response, NextFunction, Application } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes"; // BARU: Impor user routes
import { startServer } from "./utils/database";
import { PORT } from "./utils/env"; // Pastikan PORT diimpor dari env.ts dengan benar

async function init() {
  try {
    // Pastikan MONGODB_URI sudah benar di .env atau di fallback string
    const mongoUriFromEnv = process.env.MONGODB_URI;
    console.log(
      `MongoDB URI sedang digunakan: ${
        mongoUriFromEnv || "mongodb://localhost:27017/nama_database_kamu"
      }`
    ); // Logging URI

    const result = await startServer(); // startServer menggunakan MONGODB_URI dari env.ts
    console.log("Status koneksi database:", result);

    const app: Application = express(); // Menambahkan tipe Application untuk kejelasan

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // --- Menggunakan Routes Aplikasi ---
    app.use("/api/auth", authRoutes); // authRoutes sudah ada
    app.use("/api/users", userRoutes); // BARU: Daftarkan user routes dengan prefix /api/users

    app.get("/", (req: Request, res: Response) => {
      res.send("Selamat datang di API Proyek Web!");
    });

    // --- Penanganan Error Global ---
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      // Middleware error handling sudah ada
      console.error("--- TERJADI ERROR GLOBAL ---");
      console.error("Nama Error:", err.name);
      console.error("Pesan Error:", err.message);
      if (process.env.NODE_ENV === "development") {
        console.error("Stack Trace:", err.stack);
      }

      const statusCode = (err as any).statusCode || 500;
      const message = err.message || "Terjadi kesalahan pada server.";

      res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
    });

    // Pastikan PORT di-load dengan benar
    if (!PORT) {
      console.error(
        "Error: PORT tidak terdefinisi. Pastikan ada di file .env dan env.ts."
      );
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(
        `Server berjalan dengan sukses di http://localhost:${PORT} dan terhubung ke MongoDB.`
      );
    });
  } catch (error) {
    console.error(
      "Gagal menginisialisasi server atau menghubungkan ke database:",
      error
    );
    process.exit(1); // Keluar dari proses jika inisialisasi gagal
  }
}

init();
