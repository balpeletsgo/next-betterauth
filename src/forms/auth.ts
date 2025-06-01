import { z } from "zod";

const authSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(100, "Username cannot be more than 100 characters")
    .refine((data) => !data.includes(" "), {
      message: "Username cannot contain spaces",
    })
    .refine((data) => /^[a-zA-Z0-9_]+$/.test(data), {
      message: "Username can only contain letters, numbers, and underscores",
    })
    .refine((data) => data === data.toLowerCase(), {
      message: "Username cannot contain capital letters",
    }),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(255, "Name cannot be more than 255 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: z
    .string({ required_error: "Confirm password is required" })
    .min(1, "Confirm password is required")
    .min(8, "Confirm password must be at least 8 characters long"),
});

export const signInSchema = authSchema.omit({
  username: true,
  name: true,
  confirm_password: true,
});

export const signUpSchema = authSchema
  .pick({
    username: true,
    name: true,
    email: true,
    password: true,
    confirm_password: true,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
