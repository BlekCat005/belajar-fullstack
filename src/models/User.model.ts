import mongoose, { Schema, Document, model } from "mongoose";
// import bcrypt from 'bcryptjs'; // Mungkin tidak perlu di sini jika tidak ada pre-save

export interface IUser /* extends Document */ {
  username: string;
  email: string;
  password_hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Nama pengguna wajib diisi."], // Pesan error kustom
      unique: true, // Setiap username harus unik
      trim: true, // Menghapus spasi di awal dan akhir
      minlength: [3, "Nama pengguna minimal 3 karakter."],
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi."],
      unique: true,
      trim: true,
      lowercase: true, // Menyimpan email dalam huruf kecil untuk konsistensi
      // Anda bisa menambahkan validasi format email menggunakan match:
      // match: [/.+\@.+\..+/, 'Masukkan format email yang valid.']
    },
    password_hash: {
      type: String,
      required: [true, "Password hash wajib diisi."],
      // Sebaiknya tidak ada minlength di sini karena ini adalah hash
    },
  },
  {
    // 3. Opsi Skema
    timestamps: true, // Otomatis membuat field createdAt dan updatedAt
    versionKey: false, // Opsional: Menghilangkan field __v (versionKey)
    collection: "users", // Opsional: Nama koleksi di MongoDB secara eksplisit
  }
);

const User = model<IUser>("User", UserSchema);
export default User;
