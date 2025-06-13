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
                // PERBAIKAN: GANTI 'example' MENJADI 'examples' (jamak)
                examples: {
                    // Nama 'ContohRegister' ini akan muncul sebagai tab di UI Swagger
                    ContohRegister: { 
                       $ref: '#/components/examples/RegisterExample' 
                    }
                }
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
                // GANTI INI JUGA MENJADI 'examples' (jamak)
                examples: {
                    ContohLogin: {
                       $ref: '#/components/examples/LoginExample'
                    }
                }
            }
        }
     }
  */
);

export default router;
