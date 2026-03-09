import { prisma } from '../config/db.js';

const createRateLimitRepository = async (data) => {
    const {ip, count, lastHit} = data;

    return prisma.ipRateLimit.create({
        data: {
            ip: ip,
            count: count,
            lastHit: lastHit,
        },
    });
};

const updateRateLimitRepository = async (data) => {
    const {ip, count, lastHit} = data;

    return prisma.ipRateLimit.update({
        where: {
            ip: ip,
        },
        data: {
            count: count,
            lastHit: lastHit,
        },
    });
};

const rateLimitRepository = async (ip) => {
    return prisma.ipRateLimit.findUnique({
        where: {
            ip: ip,
        },
    });
};

export { createRateLimitRepository, updateRateLimitRepository, rateLimitRepository }