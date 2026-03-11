import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload) => {
    // Trim to remove accidental spaces
    const expiresIn = process.env.JWT_EXPIRES_IN?.trim() || "7d";

    // Double-check it's not empty
    if (!expiresIn) {
        throw new Error('JWT_EXPIRES_IN is not set or empty');
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};