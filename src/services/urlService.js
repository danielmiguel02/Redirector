import { generateUrlCode } from '../utils/generateCode.js';
import { createUrlRepository } from '../repositories/urlRepository.js';
import { ApiError } from '../utils/ApiError.js';

const createUrlService = async ({ url, userId }) => {
    const MAX_RETRIES = 5;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        const code = await generateUrlCode();

        try {
            const createdUrl = await createUrlRepository({
                userId: userId ?? null,
                code: code,
                originalUrl: url,
                expiresAt: userId ? null : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                clickCount: userId ? 0 : null,
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
        } catch (error) {
            if (error instanceof ApiError && error.statusCode === 409) {
                continue;
            }
            throw error;
        }
    }

    throw new ApiError(500, 'Failed to generate unique code');
};

export { createUrlService }