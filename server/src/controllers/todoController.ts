import { HydratedDocument } from "mongoose";
import { IUser, UserCollection } from "../models/userModel";

export const getAllTodoList = async (req, res, next) => {
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).end();
        }
        return res
            .status(200)
            .json({
                todoLists: user.todoLists
            });
    } catch (err: any) {
        return res.status(500).end();
    }
};

export const createTodoList = async (req, res, next) => {
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).end();
        }
        user.todoLists.push({ content: [], dateOfCreation: new Date().toString() });
        await user.save();
        return res.status(201).end();
    } catch (err: any) {
        return res.status(500).end();
    }
};

export const deleteTodoList = async (req, res, next) => {
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findById(req.body._id);
        if (!user) {
            return res.status(404).end();
        }
        const deleted = await UserCollection.findByIdAndDelete(req.body.id);
        if (!deleted) {
            return res.status(404).end();
        }
        return res.status(200).end();
    } catch (err: any) {
        return res.status(500).end();
    }
};