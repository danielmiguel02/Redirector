import express from 'express';
import { registerUserController, loginUserController, logoutUserController } from '../controllers/authController.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.js';

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

router.use(errorMiddleware);

export default router;