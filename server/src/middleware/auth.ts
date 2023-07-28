import { Request, Response, NextFunction } from "express";
import { validateToken } from "../util/token";
import { JwtPayload } from "jsonwebtoken";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const authHeader: string = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(400)
            .json({
                reason: "Request header does not contain JWT"
            });
    }
    const token: string = authHeader.split(" ")[1];
    try {
        const payload: JwtPayload | string = await validateToken(token);
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