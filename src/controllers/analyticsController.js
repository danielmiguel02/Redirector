import { urlUserAnalyticsService } from '../services/analyticsService.js';

const urlUserAnalyticsController = async (req, res, next) => {
    try {
        const result = await urlUserAnalyticsService({
            userId: req.user.id,
            code: req.params.code
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