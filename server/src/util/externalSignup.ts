import { JwtPayload } from "jsonwebtoken";
import { UserCollection } from "../models/userModel";
import { Types } from "mongoose";
import { ITodoList } from "../models/userModel";

export const googleSignup = async (email: string) => {
    try {
        await UserCollection.create({
            email: email,
            type: "google",
            todoLists: new Types.DocumentArray<ITodoList>([])
        });
    } catch (err: any) {
        console.log(err);
    }
};

export const externalSignup = (email: string, type: string): void => {
    if (type === "google") {
        googleSignup(email);
    }
}