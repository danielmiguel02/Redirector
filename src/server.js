import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB, disconnectDB } from './config/db.js';
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Import Routes
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// Load .env locally only
if (process.env.NODE_ENV !== 'production') {
  // Only load dotenv in development
  import('dotenv').then(dotenv => dotenv.config());
}

connectDB();

const app = express();

// Body parse middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/auth", authRoutes);
app.use("/url", urlRoutes);
app.use("/analytics", analyticsRoutes);

// Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on PORT ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close( async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown on SIGTERM
process.on("SIGTERM", async () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close( async () => {
        await disconnectDB();
        process.exit(0);
    });
}); 