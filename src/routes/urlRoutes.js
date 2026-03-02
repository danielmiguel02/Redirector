import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createUrlController, urlRedirectController } from '../controllers/urlController.js';

const router = express.Router();

router.post("/create", authMiddleware, createUrlController);
router.post("/:code", urlRedirectController);

export default router;