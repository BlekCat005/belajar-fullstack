// // src/types/express.d.ts

// // Penting: Pastikan baris ini ada agar memperluas modul Express,
// // bukan mendeklarasikan modul Express yang baru.
// declare namespace Express {
//   export interface Request {
//     // Properti 'user' akan ditambahkan oleh middleware autentikasi.
//     // Sesuaikan tipe 'user' dengan objek yang sebenarnya ditambahkan oleh middleware kamu.
//     // Sebagai contoh, jika middleware kamu menempelkan { id: string; role?: string; },
//     // maka sesuaikan interface User di bawah.
//     user?: {
//       id: string;
//       // Kamu bisa menambahkan properti lain dari user di sini,
//       // seperti username, email, role, dll., sesuai dengan payload token JWT-mu.
//       // Contoh:
//       // username?: string;
//       // email?: string;
//       // role?: string;
//     };
//   }
// }
