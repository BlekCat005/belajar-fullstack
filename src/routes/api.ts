// src/routes/api.ts

import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import itemController from "../controllers/item.controller";

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
                    identifier: "abcd",
                    password: "abcd1234"
                }
            }
        }
     }
  */
);

router.get(
  "/auth/me",
  authMiddleware,
  authController.me
  /*
  #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.post(
  "/items",
  authMiddleware,
  itemController.create /* #swagger.tags = ['Items']
    #swagger.summary = 'Menambahkan barang baru'
    #swagger.security = [{"bearerAuth": []}]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/ItemRequest' },
          examples: {
            itemExample: { $ref: '#/components/examples/ItemExample' }
          }
        }
      }
    }
  */
);

router.get(
  "/items",
  authMiddleware,
  itemController.getAll /* #swagger.tags = ['Items']
    #swagger.summary = 'Mendapatkan semua daftar barang'
    #swagger.security = [{"bearerAuth": []}]
  */
);

router.get(
  "/items/:id",
  authMiddleware,
  itemController.getById /* #swagger.tags = ['Items']
    #swagger.summary = 'Mendapatkan detail satu barang'
    #swagger.security = [{"bearerAuth": []}]
    #swagger.parameters['id'] = { description: 'ID unik dari barang.' }
  */
);

router.put(
  "/items/:id",
  authMiddleware,
  itemController.update /* #swagger.tags = ['Items']
    #swagger.summary = 'Memperbarui data barang'
    #swagger.security = [{"bearerAuth": []}]
    #swagger.parameters['id'] = { description: 'ID unik dari barang.' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/ItemRequest' },
          examples: {
            itemExample: { $ref: '#/components/examples/ItemExample' }
          }
        }
      }
    }
  */
);

router.delete(
  "/items/:id",
  authMiddleware,
  itemController.delete /* #swagger.tags = ['Items']
    #swagger.summary = 'Menghapus barang'
    #swagger.security = [{"bearerAuth": []}]
    #swagger.parameters['id'] = { description: 'ID unik dari barang.' }
  */
);

export default router;
