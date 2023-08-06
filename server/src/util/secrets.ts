import "dotenv/config";

export const MONGO_URI = process.env.MONGO_URI;

export const PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY;

export const PORT = process.env.PORT;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export enum OAuthProviders {
    GOOGLE
}