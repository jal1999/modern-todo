import { Request, Response, NextFunction } from "express";
import { HydratedDocument, Types } from "mongoose";
import { compare } from "bcryptjs";
import { IUser, ITodoList, UserCollection } from "../models/userModel";
import { generateToken } from "../util/token";

export const internalLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(404)
                .json({
                    reasons: { email: true }
                });
        }
        const matches: boolean = await compare(req.body.password, user.password);
        if (!matches) {
            return res
                .status(404)
                .json({
                    reasons: { password: true }
                });
        }
        return res
            .status(200)
            .json({
                token: await generateToken(user.email)
            });
    } catch (err: any) {
        return res
            .status(500)
            .end();
    }
};

export const externalSignupController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const email: string = req.body.email, type: string = req.body.type;
    try {
        await UserCollection.create({
            email: email,
            type: type,
            todoLists: new Types.DocumentArray<ITodoList>([])
        });
        return res
            .status(201)
            .end();
    } catch (err: any) {
        console.log(err);
        return res
            .status(500)
            .json({
                error: err
            });
    }
};

export const internalSignup = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const email: string = req.body.email, password: string = req.body.password, confirmPassword: string = req.body.confirmPassword;
    try {
        const user: IUser = await UserCollection.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .json({
                    explanation: "The given user could not found"
                });
        }
        const matches: boolean = await compare(password, user.password);
        if (!matches) {
            return res
                .status(404)
                .json({
                    explanation: "The given password does not match the password of the user with the given email."
                });
        }
        return res
            .status(200)
            .json({
                token: await generateToken(email)
            });
    } catch (err: any) {
        return res
            .status(500)
            .end();
    }
};