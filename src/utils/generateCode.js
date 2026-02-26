import crypto from 'crypto';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateUrlCode = async () => {   
    const length = 6;

    while (true) {
        const bytes = crypto.randomBytes(length);

        const result = Array.from(bytes, b =>
            characters[b % characters.length]
        ).join("");

        return result;
    }
};