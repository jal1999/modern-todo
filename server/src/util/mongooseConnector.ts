import { connect } from "mongoose";
import { MONGO_URI } from "./secrets";

export const connectToDb = (): void => {
    connect(MONGO_URI);
};