import { Types, Schema } from "mongoose";

export interface ITodoListEntry {
    content: string;
    completed: boolean;
    _id?: Types.ObjectId
}

export const todoListEntrySchema = new Schema<ITodoListEntry>({
    content: { type: String, required: true },
    completed: { type: Boolean, required: true }
});