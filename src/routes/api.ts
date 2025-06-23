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
  itemController.create
  /*
  #swagger.tags = ['Items']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateItemRequest"
    }
  }
  */
);

router.get(
  "/items",
  authMiddleware,
  itemController.getAll
  /*
    #swagger.tags = ['Items']
    #swagger.summary = 'Mendapatkan semua barang dengan paginasi dan pencarian'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.parameters['page'] = {
        in: 'query',
        description: 'Nomor halaman',
        type: 'integer',
        default: 1
    }
    #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Jumlah item per halaman',
        type: 'integer',
        default: 10
    }
    #swagger.parameters['search'] = {
        in: 'query',
        description: 'Kata kunci pencarian (nama atau deskripsi barang)',
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Daftar barang berhasil diambil.',
        schema: { $ref: '#/components/schemas/PaginatedItemResponse' }
    }
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
  itemController.update
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Memperbarui data barang'
     #swagger.security = [{
       "bearerAuth": []
     }]
     #swagger.parameters['id'] = { description: 'ID unik dari barang.' }
     #swagger.requestBody = {
         required: true,
         content: {
             "application/json": {
                 schema: { $ref: '#/components/schemas/CreateItemRequest' },
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
