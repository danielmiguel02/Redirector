import express from 'express';
import { registerUserController, loginUserController, logoutUserController } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

export default router;