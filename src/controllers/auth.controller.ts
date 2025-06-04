import { Request, Response } from "express"; //

import UserModel, { userDTO, userLoginDTO } from "../models/user.model"; //
import { encrypt } from "../utils/encryption"; //
import { generateToken } from "../utils/jwt"; //
import { IReqUser } from "../utils/interfaces"; //
import response from "../utils/response"; //

export default {
  async register(req: Request, res: Response) {
    //
    // Hanya fullname, username, email, password yang diambil
    const { fullname, username, email, password } = req.body; //

    try {
      // Validasi tanpa confirmPassword
      await userDTO.validate({
        //
        fullname, //
        username, //
        email, //
        password, //
      });

      const result = await UserModel.create({
        //
        fullname, //
        email, //
        username, //
        password, //
      });

      response.success(res, result, "success registration!"); //
    } catch (error) {
      response.error(res, error, "failed registration"); //
    }
  },

  async login(req: Request, res: Response) {
    //
    try {
      const { identifier, password } = req.body; //
      await userLoginDTO.validate({
        //
        identifier, //
        password, //
      });

      // Tidak ada lagi pengecekan isActive
      const userByIdentifier = await UserModel.findOne({
        //
        $or: [{ email: identifier }, { username: identifier }], //
      });

      if (!userByIdentifier) {
        //
        return response.unauthorized(res, "user not found"); //
      }

      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password; //

      if (!validatePassword) {
        //
        return response.unauthorized(res, "user not found"); //
      }

      // Token hanya berisi id
      const token = generateToken({
        id: userByIdentifier._id, //
      });

      response.success(res, token, "login success"); //
    } catch (error) {
      response.error(res, error, "login failed"); //
    }
  },

  async me(req: IReqUser, res: Response) {
    //
    try {
      const user = req.user; //
      const result = await UserModel.findById(user?.id); //

      response.success(res, result, "success get user profile"); //
    } catch (error) {
      response.error(res, error, "failed get user profile"); //
    }
  },
};
