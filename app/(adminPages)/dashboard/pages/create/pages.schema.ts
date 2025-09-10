import { z } from "zod";

export const PageSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "At Least 3 charecters are required"),
  //   title: z.string(),
});
