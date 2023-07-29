import { connect } from "mongoose";
import { MONGO_URI } from "./secrets";

export const connectToDb = async (): Promise<void> => {
    try {
        await connect(MONGO_URI);
    } catch (err: any) {
        console.log(err);
    }
};