import { Request, Response, NextFunction } from "express";
import { validateToken } from "../util/token";
import { JwtPayload } from "jsonwebtoken";

/**
 * Determines if a given request contains a valid token, and either returns a response
 * signifying that the request does not contain a valid token, or passes control to the
 * next middleware in the middleware stack.
 * 
 * If the given request contains a valid token, the payload of the token will be stored as
 * the jwtPayload prperty of the current Request object.
 * 
 * If the (valid) token's issuer is an external entity to the app (e.g. Google), and a user
 * with the given email and issuer is not already present in the database, a new user will be 
 * created with their email as well as denoting this account is associated with an account
 * from the external issuer.
 * 
 * @param req The request object
 * @param res the response object
 * @param next the next function in the middleware stack
 * @returns A response if the request does not contain a valid token, else returns nothing, and 
 * passes control to the next middleware in the middleware stack
 */
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const token: string = req.headers.authorization?.split(" ")[1];
    try {
        // const payload: JwtPayload | string = await validateToken(token, req.body.issuer);
        const payload: JwtPayload | string = await validateToken(token, "todo");
        req.jwtPayload = payload;
        next();
    } catch (err: any) {
        return res
            .status(401)
            .json({
                reason: "Invalid token",
            });
    }
};