import { z } from "zod";

export const caseSchena = z.object({
  name: z
    .string()
    .min(1, "Name is Required")
    .min(3, "At least 3 charecters Required"),
  skills: z.string(),
  // category: z
  //   .string()
  //   .min(1, "Category is Required")
  //   .refine((val) => val.length >= 1, { message: "Must choose a Category" }),
});
