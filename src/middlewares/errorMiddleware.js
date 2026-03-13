import { ZodError } from "zod";

export const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            type: "ValidationError",
            errors: err.errors,
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            type: "ApiError",
            message: err.message,
        });
    }

    return res.status(500).json({
        type: "ServerError",
        message: "Internal Server Error",
    });
};