import { Schema, Types } from "mongoose";
import { ITodoListEntry, todoListEntrySchema } from "./todoListEntrySchema";

export interface ITodoList {
    _id?: Types.ObjectId;
    content: Types.DocumentArray<ITodoListEntry>;
    dateOfCreation: number,
}

export const todoListSchema = new Schema<ITodoList>({
    content: { type: [todoListEntrySchema], required: true },
    dateOfCreation: { type: Number, required: true }
});