import { z } from "zod";

export const baseSchema = z.object({
  email: z.email("Please enter a valid email"),
  passwrord: z.string().min(8, "Password must be at least 8 characters"),
});

export const signInSchema = baseSchema.extend({
  fullName: z.string().optional(),
});

export const signUpSchema = baseSchema.extend({
  fullName: z.string().min(2, "Full Name should be more than 2 characters"),
});

export type FormValues = z.infer<typeof signInSchema>;
