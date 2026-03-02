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

const urlRedirectRepository = async (data) => {
    const {ip, userAgent, country, referer, url} = data;

    return await prisma.click.create({
        data: {
            ip: ip,
            userAgent: userAgent,
            country: country,
            referer: referer,
            url: url
        },
    });
};

const findUrlByCode = async (code) => {
    return await prisma.url.findUnique({
        where: {
            code: code,
        },
    });
};

const urlClicked = async (id) => {
    return await prisma.url.update({
        where: {
            id,
        },
        data: {
            clickCount: {increment: 1},
        },
    });
};

export { createUrlRepository, urlRedirectRepository, findUrlByCode, urlClicked };