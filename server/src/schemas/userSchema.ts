import { Types, Schema } from "mongoose";
import { ITodoList, todoListSchema } from "./todoListSchema";
import { todoListEntrySchema } from "./todoListEntrySchema";

export interface IUser {
    email: string;
    password: string;
    type: string;
    todoLists: Types.DocumentArray<ITodoList>;
    _id?: Types.ObjectId;
}

export const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    todoLists: [todoListSchema]
});