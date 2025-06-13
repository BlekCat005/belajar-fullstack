// src/routes/api.ts

import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/auth/register",
  authController.register /* #swagger.tags = ['Auth']
     #swagger.summary = 'Mendaftarkan Pengguna Baru'
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: '#/components/schemas/RegisterRequest' },
                example: {
                    fullname: "Budi Santoso",
                    username: "budisan",
                    email: "budi@example.com",
                    password: "PasswordSuperAman123!"
                }
            }
        }
     }
  */
);

router.post(
  "/auth/login",
  authController.login /* #swagger.tags = ['Auth']
     #swagger.summary = 'Login Pengguna'
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: '#/components/schemas/LoginRequest' },
                example: {
                    identifier: "budi@example.com",
                    password: "PasswordSuperAman123!"
                }
            }
        }
     }
  */
);

export default router;
