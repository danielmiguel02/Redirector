import { verifyToken } from '../utils/verifyToken.js';
import { prisma } from '../config/db.js';

export const authMiddleware = async (req, res, next) => {
  let token;

  // Grab token from header or cookie
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  // If no token, just continue as guest
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded?.id) {
      req.user = null;
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    req.user = user || null;

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};