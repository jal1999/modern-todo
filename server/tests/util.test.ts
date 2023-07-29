import { isValidEmailDomain } from "../src/util/email/generate";
import { describe, test, expect } from "@jest/globals";
import { MONGO_URI } from "../src/util/secrets";
import { connectToDb } from "../src/util/mongooseConnector";
import mongoose from "mongoose";

describe("MongoDB Connection", () => {
    test("Connects to the database with the proper URI", async () => {
        const readyState: number = (await connectToDb(MONGO_URI)).connections[0].readyState;
        expect(readyState).toBe(1);
        await mongoose.connection.close();
    });

    test("Throws an error when trying to connect with the incorrect URI", async () => {
        expect(typeof (await connectToDb("hello"))).not.toBe(typeof import("mongoose"));
    });
});

describe("Email Validity", () => {
    test("Determines dslkaj is not a valid email domain", () => {
        expect(isValidEmailDomain("dslkaj.net")).toBe(false);
    });

    test("Determines googl is not a valid email domain", () => {
        expect(isValidEmailDomain("googl.com")).toBe(false);
    });

    test("Determines gmail is a valid email domain", () => {
        expect(isValidEmailDomain("gmail.com")).toBe(true);
    });
});