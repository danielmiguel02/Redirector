import { createUrlService, urlRedirectService } from '../services/urlService.js';
import { createUrlSchema } from '../validators/urlValidator.js';
import { rateLimitService } from '../services/rateLimitService.js';

const createUrlController = async (req, res, next) => {
    try {
        const { url } = createUrlSchema.parse(req.body);

        const result = await createUrlService({
            url,
            userId: req.user?.id,
        });

        const ip = req.headers["x-forwarded-for"]?.split(",")[0] ||
                   req.socket.remoteAddress;

        await rateLimitService(ip);

        return res.status(201).json({
            message: "Url created successfully",
            url: result.url,
        });

    } catch (error) {
        return next(error);
    }
};

const urlRedirectController = async (req, res, next) => {
    try {
        const ip = req.headers["x-forwarded-for"]?.split(",")[0] ||
                   req.socket.remoteAddress;

        const userAgent = req.headers["user-agent"];

        const referer = req.headers["referer"] || null;

        const result = await urlRedirectService({
            code: req.params.code,
            ip: ip,
            userAgent: userAgent,
            referer: referer,
        });

        return res.redirect(302, result.originalUrl);

    } catch (error) {
        return next(error);
    }
};

export { createUrlController, urlRedirectController };