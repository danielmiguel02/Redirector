import { ApiError } from '../utils/ApiError.js';
import { createRateLimitRepository, updateRateLimitRepository, rateLimitRepository } from '../repositories/rateLimitRepository.js';

const RATE_LIMIT = 5; // max attempts
const WINDOW_TIME = 60 * 1000; // 1 minute

const rateLimitService = async (ip) => {
    if (!ip) {
        throw new ApiError(401, "No ip to create rate limit")
    }

    const limit = await rateLimitRepository(ip);
    const now = Date.now();

    if (!limit) {
        await createRateLimitRepository({
            ip: ip,
            count: 1,
            lastHit: new Date(Date.now()),
        });
        return;
    }

    const timeSinceLastHit = now - limit.lastHit.getTime();

    if (timeSinceLastHit > WINDOW_TIME) {
        await updateRateLimitRepository({
            ip: ip,
            count: 1,
            lastHit: now,
        });
        return;
    }

    if (limit.count >= RATE_LIMIT) {
        throw new ApiError(429, "Url creation is limited to 5 per minute");
    }

    await updateRateLimitRepository({
        ip: ip,
        count: limit.count + 1,
        lastHit: now,
    });
};

export { rateLimitService };