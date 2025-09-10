import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "At least 3 charecters are required"),
  //   title: z.string(),
  //   //     .min(1, "Name is required")
  //   //     .min(3, "At least 3 charecters are required"),
});
