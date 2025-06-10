import { z } from "zod";

export const IssueSchema = z.object({
   title: z.string().min(5, { message: "Title is required" }).max(255),
   description: z
      .string()
      .min(5, { message: "Description is required" })
      .max(65535),
});

export const PatchIssueSchema = z.object({
   title: z
      .string()
      .min(5, { message: "Title is required" })
      .max(255)
      .optional(),
   description: z
      .string()
      .min(5, { message: "Description is required" })
      .max(65535)
      .optional(),
   assignToUserId: z.string().min(1).max(255).optional().nullable(),
});
