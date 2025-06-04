import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/auth/register",
  authController.register
  /*
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/RegisterRequest"
    }
  }
  */
);
router.post(
  "/auth/login",
  authController.login
  /*
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/LoginRequest"
    }
  }
  */
);

export default router;
