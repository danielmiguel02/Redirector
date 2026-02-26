import { generateUrlCode } from '../utils/generateCode.js';
import { createUrlRepository } from '../repositories/urlRepository.js';

const createUrlService = async ({ url, userId }) => {
    if (userId) {
        // Logged in user
        const code = await generateUrlCode();

        const createdUrl = await createUrlRepository({
            userId: userId,
            code: code,
            originalUrl: url,
            expiresAt: null,
        });

        return {
            url: {
                id: createdUrl.id,
                userId: createdUrl.userId,
                code: createdUrl.code,
                originalUrl: createdUrl.originalUrl,
                expiresAt: createdUrl.expiresAt,
            },
        };
    } else {
        // Logged out user
        const code = await generateUrlCode();

        const createdUrl = await createUrlRepository({
            userId: null,
            code: code,
            originalUrl: url,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            clickCount: null,
        });

        return {
            url: {
                id: createdUrl.id,
                userId: createdUrl.userId,
                code: createdUrl.code,
                originalUrl: createdUrl.originalUrl,
                expiresAt: createdUrl.expiresAt,
            },
        };
    }
};

export { createUrlService };