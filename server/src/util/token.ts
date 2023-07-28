import { JwtPayload, sign, verify } from "jsonwebtoken";
import { PRIVATE_KEY } from "./secrets";

export const generateToken = (email: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        sign({ email: email }, PRIVATE_KEY, { issuer: "todo", expiresIn: "1h" }, (err, encodedToken) => {
            if (err) {
                reject();
            }
            resolve(encodedToken);
        });
    });
};

export const verifyToken = (encodedToken: string): Promise<string | JwtPayload> => {
    return new Promise((resolve, reject) => {
       verify(encodedToken, PRIVATE_KEY, (err, payload) => {
            if (err) {
                reject();
            }
            resolve(payload);
       });
    });
};