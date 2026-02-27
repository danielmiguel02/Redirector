import { prisma } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

const createUrlRepository = async (data) => {
    const {code, originalUrl, expiresAt, user} = data;
    try {
        return await prisma.url.create({
            data: {
                code: code,
                originalUrl: originalUrl,
                expiresAt: expiresAt,
                user: user
            },
        });

    } catch (error) {
        // Extremely rare but code could not be unique
        if (error.code === 'P2002') {
            throw new ApiError(409, 'Code already exists');
        }
        throw error;
    }
};

export { createUrlRepository };