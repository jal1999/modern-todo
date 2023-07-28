import { Types, Schema, model } from "mongoose";

interface ITodoListEntry {
    content: string;
    completed: boolean;
    _id?: Types.ObjectId
}

const todoListEntrySchema = new Schema<ITodoListEntry>({
    content: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

interface ITodoList {
    _id?: Types.ObjectId;
    content: Types.DocumentArray<ITodoListEntry>;
    dateOfCreation: number,
}

const todoListSchema = new Schema<ITodoList>({
    content: { type: [todoListEntrySchema], required: true },
    dateOfCreation: { type: Number, required: true }
});

export interface IUser {
    email: string;
    password: string;
    type: string;
    todoLists: Types.DocumentArray<ITodoList>;
    _id?: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    todoLists: [todoListSchema]
});

export const UserCollection = model<IUser>("User", userSchema);