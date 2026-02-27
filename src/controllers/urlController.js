import { createUrlService } from '../services/urlService.js';
import { createUrlSchema } from '../validators/urlValidator.js';

const createUrlController = async (req, res, next) => {
    try {
        const { url } = createUrlSchema.parse(req.body);

        const result = await createUrlService({
            url,
            userId: req.user?.id,
        });

        return res.status(201).json({
            message: "Url created successfully",
            url: result.url,
        });

    } catch (error) {
        return next(error);
    }
};

export { createUrlController };