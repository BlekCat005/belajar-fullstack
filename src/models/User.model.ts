import mongoose from "mongoose";
import { encrypt } from "../utils/encryption"; //
import * as Yup from "yup"; //

// Validasi password tetap sama
const validatePassword = Yup.string()
  .required()
  .min(8, "Password must be at least 8 characters") //
  .test(
    "at-least-one-number",
    "Password must contain at least one number",
    (value) => {
      if (!value) return false;
      const regex = /^(?=.*\d)/;
      return regex.test(value);
    }
  );

export const USER_MODEL_NAME = "User";

// Skema validasi untuk login tetap sama
export const userLoginDTO = Yup.object({
  identifier: Yup.string().required(),
  password: validatePassword,
});

// Skema validasi untuk registrasi (hanya fullName, username, email, password)
export const userDTO = Yup.object({
  fullname: Yup.string().required(), //
  username: Yup.string().required(),
  email: Yup.string().email().required(), //
  password: validatePassword, //
}); //

export type TypeUser = Yup.InferType<typeof userDTO>; //

// Interface User disederhanakan
export interface User extends TypeUser {
  createdAt?: string;
}

const Schema = mongoose.Schema; //

const UserSchema = new Schema<User>(
  {
    fullname: {
      type: Schema.Types.String, //
      required: true, //
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String, //
      required: true, //
      unique: true, //
    },
    password: {
      type: Schema.Types.String, //
      required: true, //
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    user.password = encrypt(user.password);
  }
  next();
});

UserSchema.methods.toJSON = function () {
  //
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model(USER_MODEL_NAME, UserSchema);

export default UserModel;
