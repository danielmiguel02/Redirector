import { verifyToken } from '../utils/verifyToken.js';
import { prisma } from '../config/db.js';

export const authMiddleware = async (req, res, next) => {
  let token = req.cookies?.jwt;

  // If no token, just continue as guest
  if (!token && req.headers.authorization?.statsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    req.user = user || null;

    next();
  } catch (error) {
    // If token invalid, just treat as guest
    req.user = null;
    next();
  }
};