import { generateUrlCode } from '../utils/generateCode.js';
import { createUrlRepository, urlRedirectRepository, findUrlByCode, urlClicked } from '../repositories/urlRepository.js';
import { ApiError } from '../utils/ApiError.js';
import { getCountryFromIP } from '../utils/urlUtils.js';

const createUrlService = async ({ url, userId }) => {
    const MAX_RETRIES = 5;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        const code = await generateUrlCode();

        try {
            const createdUrl = await createUrlRepository({
                code: code,
                originalUrl: url,
                expiresAt: userId ? null : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                user: userId ? { connect: { id: userId } } : undefined,
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

const urlRedirectService = async ({code, ip, userAgent, referer}) => {
    if (!code) {
        throw new ApiError(400, "Code is required")
    }

    const url = await findUrlByCode(code);

    if (!url) {
        throw new ApiError(401, "Url doesn't exist with that code");
    }

    const country = ip ? await getCountryFromIP(ip) : null;

    const urlRedirector = await urlRedirectRepository({
        ip: ip,
        userAgent: userAgent,
        country: country,
        referer: referer,
        url: { connect: { id: url.id } }
    });
    
    await urlClicked(); //Increases url clickCount

    return {
        click: {
            id: urlRedirector.id,
            urlId: urlRedirector.urlId,
            ip: urlRedirector.ip,
            userAgent: urlRedirector.userAgent,
            country: urlRedirector.country,
            referer: urlRedirector.referer,
        },
        originalUrl: url.originalUrl,
    };
};

export { createUrlService, urlRedirectService }