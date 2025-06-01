import { z } from "zod";

const authSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email({ message: "Invalid email format" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters long"),
	name: z
		.string({ required_error: "Name is required" })
		.min(1, "Name is required")
		.refine((val) => val.trim() !== "", {
			message: "Name cannot be empty",
		})
		.refine((val) => !val.includes(" "), {
			message: "Name cannot contain spaces",
		}),
});

export const signInSchema = authSchema.omit({
	name: true,
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = authSchema.pick({
	email: true,
	password: true,
	name: true,
});
