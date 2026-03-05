import { urlUserAnalyticsService } from '../services/analyticsService.js';

const urlUserAnalyticsController = async (req, res, next) => {
    // User will see originalUrl, clickCount, % of userAgent, % of country, % of referer
    try {
        const result = await urlUserAnalyticsService({
            userId: req.user.id,
            urlId: req.params.urlId
        });
    
        return res.status(200).json({
            message: "User analytics successfully retrieved",
            result
        });
    } catch (error) {
        return next(error);
    }
};

export { urlUserAnalyticsController };