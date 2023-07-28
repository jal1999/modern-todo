import { describe } from "node:test";
import { isValidEmailDomain } from "../src/util/email/generate";
import { test, expect } from "@jest/globals";

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