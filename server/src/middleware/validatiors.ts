import { Request, Response, NextFunction } from "express";
import { isValidEmailDomain } from "../util/email/generate";
import { OAuthProviders } from "../util/secrets";

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
                reason: { email: true }
            });
    }
    const domain: string = email.split("@")[1];
    if (!isValidEmailDomain(domain)) {
        return res
            .status(400)
            .json({
                reason: { email: true }
            });
    }
    next();
};

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
                reason: { password: true }
            });
    }
    next();
};

export const authorizationHeaderValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
    const authHeader: string = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(400)
            .json({
                reason: "Authorization header not present in the request."
            });
    }
    req.token = authHeader.split(" ")[1];
    next();
};

export const externalSignupValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
    const email: string = req.body.email, type: string = req.body.type;
    if (!new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm").test(email) || OAuthProviders[type.toUpperCase()] === undefined) {
        return res
            .status(400)
            .json({
                explanation: `Either the given email is not valid, or the given OAuth provider is not in the list ${OAuthProviders}`
            });
    }
};

export const internalSignupValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
    const password: string = req.body.password, confirmPassword: string = req.body.confirmPassword;
    if (confirmPassword !== password) {
        return res
            .status(400)
            .json({
                reason: { confirmPassword: true }
            });
    }
    next();
};