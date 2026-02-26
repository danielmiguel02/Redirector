import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createUrlController } from '../controllers/urlController.js';

const router = express.Router();

router.post("/create", authMiddleware, createUrlController);

export default router;