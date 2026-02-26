import { z } from "zod";

export const createUrlSchema = z.object({
  url: z
    .string()
    .trim()
    .url({ message: "Must be a valid URL"}),
});