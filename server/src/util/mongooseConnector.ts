import { connect } from "mongoose";
import { MONGO_URI } from "./secrets";

export const connectToDb = async (): Promise<void> => {
    await connect(MONGO_URI);
};