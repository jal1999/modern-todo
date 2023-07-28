import fs from "fs";
import path from "path";

const emailProviders: Array<string> = fs.readFileSync(path.join(__dirname, "email-providers.txt")).toString().split("\n");

export const isValidEmailDomain = (emailDomain: string): boolean => emailProviders.includes(emailDomain);
