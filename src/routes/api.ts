import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/auth/register",
  authController.register
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Mendaftarkan Pengguna Baru'
    #swagger.description = 'Endpoint untuk membuat akun pengguna baru.'

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
                // INI BAGIAN PENTING YANG KITA TAMBAHKAN
                examples: {
                    ContohRegister: {
                        value: { 
                            fullname: "Budi Santoso",
                            username: "budisan",
                            email: "budi@example.com",
                            password: "PasswordSuperAman123!" 
                        }
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
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login Pengguna'
    #swagger.description = 'Endpoint untuk autentikasi dan mendapatkan token.'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
                // DAN INI JUGA KITA TAMBAHKAN
                examples: {
                    ContohLogin: {
                        value: {
                            email: "user@example.com",
                            password: "password123"
                        }
                    }
                }
            }
        }
    }
  */
);

export default router;
