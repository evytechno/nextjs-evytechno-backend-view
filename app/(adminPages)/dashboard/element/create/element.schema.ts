import { z } from "zod";

export const elementSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "At least 3 charecters are required"),
  //   title: z.string(),
  //   //     .min(1, "Name is required")
  //   //     .min(3, "At least 3 charecters are required"),
  service: z
    .string()
    .min(1, "Category is Required")
    .refine((val) => val.length >= 1, { message: "Must choose a Category" }),
});
