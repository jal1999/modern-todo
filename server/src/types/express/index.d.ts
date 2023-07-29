import { JwtPayload } from "jsonwebtoken";

// In order to add custom properties on the Request object
declare global {
    namespace Express {
        export interface Request {
            jwtPayload?: JwtPayload | string,
            token?: string
        }
    }
}

export {}