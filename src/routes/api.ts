// src/routes/api.ts

import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/auth/register",
  authController.register
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Mendaftarkan Pengguna Baru'
     #swagger.requestBody = {
        content: {
            "application/json": {
                schema: { $ref: '#/components/schemas/RegisterRequest' },
                // Cukup panggil referensi contoh yang sudah kita buat
                example: { $ref: '#/components/examples/RegisterExample' }
            }
        }
     }
  */
);

router.post(
  "/auth/login",
  authController.login
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Login Pengguna'
     #swagger.requestBody = {
        content: {
            "application/json": {
                schema: { $ref: '#/components/schemas/LoginRequest' },
                // Panggil juga referensi untuk contoh login
                example: { $ref: '#/components/examples/LoginExample' }
            }
        }
     }
  */
);

export default router;
