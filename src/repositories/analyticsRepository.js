import { prisma } from '../config/db.js';

const urlUserAnalyticsRepository = async (data) => {
    const {code} = data;

    // return originalUrl, clickCount, userAgent, country, referer
    const urlData = await prisma.url.findUnique({
        where: {
            code: code,
        },
        select: {
            id: true,
            originalUrl: true,
            clickCount: true,
        },
    });

    const clickData = await prisma.click.findMany({
        where: {
            urlId: urlData.id,
        },
        select: {
            userAgent: true,
            country: true,
            referer: true,
        },
    });

    return { urlData, clickData };
};

export { urlUserAnalyticsRepository };