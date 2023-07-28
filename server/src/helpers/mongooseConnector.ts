import { connect } from "mongoose";

export const connectToDb = (): void => {
    connect(process.env.URI);
};