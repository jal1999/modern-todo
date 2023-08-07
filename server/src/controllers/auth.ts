import { Request, Response, NextFunction } from "express";
import { HydratedDocument, Types } from "mongoose";
import { compare } from "bcryptjs";
import { hashPassword } from "../util/bcryptHelpers";
import { IUser, ITodoList, UserCollection } from "../models/userModel";
import { GenerateToken, generateToken } from "../util/token";

export const internalLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    // console.log(req.cookies);
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
        const token: GenerateToken = await generateToken(user.email);
        return res
            .cookie("token", token.token, { maxAge: token.expires, httpOnly: true })
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
        const user: HydratedDocument<IUser> = await UserCollection.findOne({ email: email });
        if (user) {
            return res
                .status(400)
                .json({
                    explanation: "The given user is already signed up."
                });
        }
        await UserCollection.create({
            email: email,
            password: await hashPassword(password),
            type: "internal",
            todoLists: new Types.DocumentArray<ITodoList>([])
        });
        return res
            .status(201)
            .end();
    } catch (err: any) {
        return res
            .status(500)
            .end();
    }
};