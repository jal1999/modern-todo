import { JwtPayload, sign, verify } from "jsonwebtoken";
import { PRIVATE_KEY } from "./secrets";
import { OAuth2Client, LoginTicket, TokenPayload } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../util/secrets";
import assert from "node:assert";

export interface GenerateToken {
    token: string;
    expires: number;
}

export const generateToken = (email: string): Promise<GenerateToken | undefined> => {
    return new Promise((resolve, reject) => {
        sign({ email: email }, PRIVATE_KEY, { issuer: "todo", expiresIn: "1h" }, (err, encodedToken) => {
            if (err) {
                reject();
            }
            resolve({ token: encodedToken, expires: 60 * 60 * 1000});
        });
    });
};

export const validateToken = (encodedToken: string, issuer: string): Promise<string | JwtPayload | TokenPayload | undefined> => {
    assert(PRIVATE_KEY)
    return new Promise(async (resolve, reject) => {
        if (issuer === "todo") {
            verify(encodedToken, PRIVATE_KEY, (err, payload) => {
                if (err) {
                    reject(err);
                }
                resolve(payload);
            });
        } else {
            const oauthClient = new OAuth2Client();
            try {
                const ticket: LoginTicket = await oauthClient.verifyIdToken({
                    idToken: encodedToken,
                    audience: GOOGLE_CLIENT_ID
                });
                const payload: TokenPayload | undefined = ticket.getPayload();
                resolve(payload);
            } catch (err: any) {
                reject(err);
            }
        }
    });
};