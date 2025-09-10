import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is Required")
    .min(3, "At least 3 charecters for Title"),
  short_description: z
    .string()
    .min(1, "Title is Required")
    .min(20, "At least 20 charecters for Short Description"),
  // category: z
  //   .string()
  //   .min(1, "Category is Required")
  //   .refine((val) => val.length >= 1, { message: "Must choose a Category" }),
  // content: z.string(),
  // // .min(1, "Category is Required")
  // // .min(200, "At least 200 charecters are must"),
  seo_title: z.string().optional(),

  seo_description: z.string().optional(),

  keywords: z.string().optional(),

  // banner: z.any(),
  // // .refine(
  // //   (files) =>
  // //     files?.[0]?.type === "image/jpeg" ||
  // //     files?.[0]?.type === "image/png" ||
  // //     files?.[0]?.type === "image/jpg",
  // //   { message: "Only .jpg, .jpeg, .png formats are supported" }
  // // )
  // // .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
  // //   message: "Max file size is 5MB",
  // // }),
});
