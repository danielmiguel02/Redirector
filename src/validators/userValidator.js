import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" }),

  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format" })
    .toLowerCase(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must include uppercase letter" })
    .regex(/[a-z]/, { message: "Must include lowercase letter" })
    .regex(/[0-9]/, { message: "Must include a number" }),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});