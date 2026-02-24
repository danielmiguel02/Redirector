import { registerUserService, loginUserService } from '../services/authService.js';
import { registerUserSchema, loginUserSchema } from '../validators/userValidator.js';

const registerUserController = async (req, res, next) => {
    try {
        const parsed = registerUserSchema.safeParse(req.body);

        if (!parsed.success) {
            const errors = parsed.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            return res.status(400).json({ errors });
        }

        const user = await registerUserService(parsed.data);
        
        return res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        return next(error);
    }
};

const loginUserController = async (req, res, next) => {
    try {
        const data = loginUserSchema.parse(req.body);

        const result = await loginUserService(data);

        res.cookie("jwt", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: result.user
        });
    } catch (error) {
        return next(error);
    }
};

const logoutUserController = async (req, res, next) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: new Date(0),
        });

        return res.status(200).json({
            status: "success",
            message: "User logged out successfully"
        });

    } catch (error) {
        return next(error);
    }
};

export { registerUserController, loginUserController, logoutUserController };