// File swagger-generator.js atau yang sejenis

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
  // Di dalam components, kita akan tambahkan blok "examples"
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      // Skema tetap sama seperti yang sudah kita perbaiki
      LoginRequest: {
        type: "object",
        properties: {
          identifier: { type: "string" },
          password: { type: "string" },
        },
      },
      RegisterRequest: {
        type: "object",
        properties: {
          fullname: { type: "string" },
          username: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    // ==========================================================
    // INI BAGIAN BARU YANG KITA TAMBAHKAN
    // ==========================================================
    examples: {
      RegisterExample: {
        value: {
          fullname: "Budi Santoso",
          username: "budisan",
          email: "budi@example.com",
          password: "PasswordSuperAman123!",
        },
        summary: "Contoh payload untuk registrasi",
      },
      LoginExample: {
        value: {
          email: "budi@example.com",
          password: "PasswordSuperAman123!",
        },
        summary: "Contoh payload untuk login",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/api.ts"]; // Sesuaikan path ini jika perlu

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
