import { findUrlByCode } from '../repositories/urlRepository.js';
import { urlUserAnalyticsRepository } from '../repositories/analyticsRepository.js';
import { ApiError } from '../utils/ApiError.js';

const urlUserAnalyticsService = async ({userId, code}) => {
    const url = await findUrlByCode(code);

    if (!url) {
        throw new ApiError(400, "Code doesn't have a url");
    }

    if (url.userId === null || url.userId !== userId) {
        throw new ApiError(401, "Not authorized");
    }

    const urlAnalytics = await urlUserAnalyticsRepository ({
        userId: userId,
        code: code,
    });

    // User will see originalUrl, clickCount, % of userAgent, % of country, % of referer
    return {
        analytics: {
            url: {
                originalUrl: urlAnalytics.originalUrl,
                clickCount: urlAnalytics.clickCount,
            },
            statistics: {
                userAgent: urlAnalytics.userAgent,
                country: urlAnalytics.country,
                referer: urlAnalytics.referer,
            },
        },
    };
};

export { urlUserAnalyticsService };