import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

const startServer = async () => {
  try {
    // (4) UNCOMMENT bagian koneksi MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log(
      `Berhasil terhubung ke MongoDB! Database: ${mongoose.connection.name}`
    );
    return Promise.resolve("Database terhubung");
  } catch (error) {
    // (6) Ubah pesan log error jika perlu
    return Promise.reject("Gagal terhubung ke database");
  }
};

export default startServer;
