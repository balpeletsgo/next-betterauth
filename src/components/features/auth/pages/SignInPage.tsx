"use client";

import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/features/auth/components/AuthLayout";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/forms/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import Link from "next/link";
import SignInForm from "@/components/features/auth/form/SignInForm";
import { useState } from "react";
import { authClient } from "@/lib/authClient";

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSignIn(data: z.infer<typeof signInSchema>) {
		console.log("Sign-in data:", data);

		await authClient.signIn.email(
			{
				email: data.email,
				password: data.password,
			},
			{
				onRequest: () => {
					setIsLoading(true);
				},
				onSuccess: () => {
					setIsLoading(false);
				},
				onError: (ctx) => {
					setIsLoading(false);
					form.setError("email", {
						type: "manual",
						message: ctx.error.message || "An error occurred during sign-in",
					});
				},
			}
		);
	}

	return (
		<AuthLayout>
			<div className="grid h-full w-full p-0 md:grid-cols-2">
				<div className="bg-muted relative hidden md:block">
					<img
						src="/placeholder.svg"
						alt="Image"
						className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</div>
				<div className="mx-auto my-auto flex h-full max-h-2/4 w-full max-w-sm flex-col items-center justify-between">
					<div className="flex flex-col items-center text-center">
						<h1 className="text-2xl font-bold">Welcome back</h1>
						<p className="text-muted-foreground text-balance">
							Login to your Acme Inc account
						</p>
					</div>
					<Form {...form}>
						<SignInForm onSignIn={onSignIn} isLoading={isLoading} />
					</Form>
					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<Button variant="link" className="p-0" asChild>
							<Link href="/register">Register</Link>
						</Button>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
}
