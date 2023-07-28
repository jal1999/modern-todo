import { Request, Response, NextFunction } from "express";
import { isValidEmailDomain } from "../util/email/generate";

export const emailValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
    // Regular expression that meets the official standards of validating emails
    //
    // SOURCE: https://www.abstractapi.com/guides/email-validation-regex-javascript#:~:text=Using%20Regular%20Expressions%20in%20Javascript%20Email%20Validation,-Once%20you%20have&text=You%20just%20need%20to%20create,%60%7B%7C%7D~%5E.
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const email: string = req.body.email;
    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({
                reason: "The given email is not valid."
            });
    }
    const domain: string = email.split("@")[1];
    if (!isValidEmailDomain(domain)) {
        return res
            .status(400)
            .json({
                reason: "The given email domain is not valid."
            });
    }
    next();
}

export const passwordValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
    // Regular expression that ensures the password is at least 8 characters, contains 1 lowercase, uppercase, number, and special character
    //
    // SOURCE: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const passwordRegex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, "gm");
    const password: string = req.body.password;
    if (!passwordRegex.test(password)) {
        return res
            .status(400)
            .json({
                reason: "The given password is not valid."
            });
    }
    next();
}