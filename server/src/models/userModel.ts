import { model } from "mongoose";
import { IUser } from "../schemas/userSchema";
import { userSchema } from "../schemas/userSchema";

export const UserCollection = model<IUser>("User", userSchema);