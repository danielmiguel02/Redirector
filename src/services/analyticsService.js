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

    const { urlData, clickData } = await urlUserAnalyticsRepository({ code });

    const totalClicks = clickData.length || 1;

    const computePercentages = (field) => {
        const counts = {};
        clickData.forEach((click) => {
            const value = click[field] || "Unknown";
            counts[value] = (counts[value] || 0) + 1;
        });

        const percentages = {};
        for (const key in counts) {
            percentages[key] = ((counts[key] / totalClicks) * 100).toFixed(2);
        }
        return percentages;
    };

    // User will see originalUrl, clickCount, % of userAgent, % of country, % of referer
    return {
        analytics: {
            url: {
                originalUrl: urlData.originalUrl,
                clickCount: urlData.clickCount,
            },
            statistics: {
                userAgent: computePercentages("userAgent"),
                country: computePercentages("country"),
                referer: computePercentages("referer"),
            },
        },
    };
};

export { urlUserAnalyticsService };