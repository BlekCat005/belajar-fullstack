import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Fullstack Web",
    description: "Dokumentasi API untuk proyek belajar fullstack web.",
  },
  servers: [
    {
      url: "http://localhost:3000/api", // Sesuaikan port jika berbeda
      description: "Local Server",
    },
    {
      url: "https://belajar-fullstack-be.vercel.app/api", // Pastikan ini URL backend-mu
      description: "Deployed Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        description: "Masukkan token JWT yang didapat setelah login",
      },
    },
    // Bagian ini yang kita perbaiki secara total
    schemas: {
      LoginRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email pengguna yang terdaftar.",
            example: "user@example.com",
          },
          password: {
            type: "string",
            description: "Password pengguna.",
            example: "password123",
          },
        },
        required: ["email", "password"], // Menandakan field ini wajib diisi
      },
      RegisterRequest: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
            example: "Budi Santoso",
          },
          username: {
            type: "string",
            example: "budisan",
          },
          email: {
            type: "string",
            example: "budi@example.com",
          },
          password: {
            type: "string",
            example: "PasswordSuperAman123!",
          },
        },
        required: ["fullname", "username", "email", "password"],
      },
    },
  },
};

// Pastikan path ini benar sesuai struktur foldermu
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/api.ts"]; // Contoh path yang umum

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
