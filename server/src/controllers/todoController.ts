import { Types, HydratedDocument } from "mongoose";
import { ITodoListEntry, ITodoList, IUser, UserCollection } from "../models/userModel";

export const getAllTodoLists = async (req, res, next) => {
    const email: string = req.query.email;
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: email });
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

export const addTodoEntry = async (req, res, next) => {
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).end();
        }
        const todoList: ITodoList = user.todoLists.find((todoListEntry) => todoListEntry._id.toString() === req.body._id);
        if (!todoList) {
            return res.status(404).end();
        }
        todoList.content.push({ content: "", completed: false });
        await user.save();
        return res.status(201).end();
    } catch (err: any) {
        console.log(err);
        return res.status(500).end();
    }
};

export const editTodoEntry = async (req, res, next) => {
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).end();
        }
        const todoList: ITodoList = user.todoLists.find((todoListEntry) => todoListEntry._id.toString() === req.body.todoListId);
        if (!todoList) {
            return res.status(404).end();
        }
        const entry: ITodoListEntry = todoList.content.find((entry) => entry._id.toString() === req.body.todoListEntryId);
        if  (!entry) {
            return res.status(404).end();
        }
        entry.content = req.body.content;
        await user.save();
        return res.status(201).end();
    } catch (err: any) {
        console.log(err);
        return res.status(500).end();
    }
};

export const deleteTodoEntry = async (req, res, next) => {
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).end();
        }
        const todoList: ITodoList = user.todoLists.find((todoListEntry) => todoListEntry._id.toString() === req.body.todoListId);
        if (!todoList) {
            return res.status(404).end();
        }
        todoList.content = todoList.content.pull(req.body.todoListEntryId);
        await user.save();
        return res.status(201).end();
    } catch (err: any) {
        console.log(err);
        return res.status(500).end();
    }
};