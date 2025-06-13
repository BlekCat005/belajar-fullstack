// File swagger-generator.js atau yang sejenis

import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    // ... (info tidak berubah)
  },
  servers: [
    // ... (servers tidak berubah)
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
          email: { type: "string" },
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
        // Nama contoh untuk registrasi
        value: {
          fullname: "Budi Santoso",
          username: "budisan",
          email: "budi@example.com",
          password: "PasswordSuperAman123!",
        },
        summary: "Contoh payload untuk registrasi",
      },
      LoginExample: {
        // Nama contoh untuk login
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
