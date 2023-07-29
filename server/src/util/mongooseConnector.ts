import { connect } from "mongoose";

export const connectToDb = async (uri: string): Promise<typeof import("mongoose")> => {
    try {
        return (await connect(uri));
    } catch (err: any) {
        console.log(err);
    }
};