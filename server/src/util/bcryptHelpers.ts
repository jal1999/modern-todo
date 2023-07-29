import { genSalt, hash } from "bcryptjs";

export const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        genSalt(10, (err, salt) => {
            hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    reject();
                }
                resolve(hashedPassword);
            });
        });
    });
};