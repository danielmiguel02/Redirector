import express from 'express';
import { urlUserAnalyticsController } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/:code", authMiddleware, urlUserAnalyticsController);

export default router;