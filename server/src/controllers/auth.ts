import { Request, Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import { compare } from "bcryptjs";
import { IUser, UserCollection } from "../models/userModel";
import { generateToken } from "../util/token";
import { googleSignup } from "../util/externalSignup";

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

export const externalSignup = (req: Request, res: Response, next: NextFunction): Response => {
    const email: string = req.body.email, type: string = req.body.type;
    if (type === "google") {
        googleSignup(email);
        return res
            .status(201)
            .end();
    }
    return res
        .status(400)
        .json({
            explanation: `${type} is not a valid OAuth provider of this application.`
        });
};