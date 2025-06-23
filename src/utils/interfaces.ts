// Fullstack Web - Copy/be-web/src/utils/interfaces.ts
import { Types } from "mongoose";
import { User } from "../models/user.model";
import { Request } from "express";

export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullname"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

export interface IReqUser extends Request {
  user?: IUserToken;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string; // Tambahkan properti sortBy opsional
  sortOrder?: "asc" | "desc"; // Tambahkan properti sortOrder opsional, dengan nilai yang spesifik
}
