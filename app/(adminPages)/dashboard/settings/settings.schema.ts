import { z } from "zod";

export const settingsSchema = z.object({
  title: z
    .string()
    .min(1, "Name is required")
    .min(3, "At least 3 charecters are required"),
  email: z.email(),
});
