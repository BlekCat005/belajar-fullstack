import Jwt from "jsonwebtoken";
import { SECRET } from "./env";
import { IUserToken } from "../utils/interfaces";

export const generateToken = (user: IUserToken): string => {
  const token = Jwt.sign(user, SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const getUserData = (token: string) => {
  const user = Jwt.verify(token, SECRET) as IUserToken;
  return user;
};
