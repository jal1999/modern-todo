import { Types, Schema, model } from "mongoose";

export interface ITodoListEntry {
    content: string;
    completed: boolean;
}

const todoListEntrySchema = new Schema<ITodoListEntry>({
    content: String,
    completed: { type: Boolean, required: true }
});

export interface ITodoList {
    content: Types.DocumentArray<ITodoListEntry>;
    dateOfCreation: string
}

const todoListSchema = new Schema<ITodoList>({
    content: { type: [todoListEntrySchema], required: true },
    dateOfCreation: { type: String, required: true }
});

export interface IUser {
    email: string;
    password?: string;
    type: string;
    todoLists: Types.DocumentArray<ITodoList>;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: String,
    type: { type: String, required: true },
    todoLists: { type: [todoListSchema], required: true }
});

export const UserCollection = model<IUser>("User", userSchema);