"use client";

import AuthLayout from "@/components/features/auth/components/AuthLayout";
import { SignInForm } from "@/components/features/auth/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signInSchema } from "@/forms/auth";
import { authClient } from "@/lib/auth.client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignInPage() {
  const router = useRouter();
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
          router.push("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          form.setError("email", {
            type: "manual",
            message: ctx.error.message || "An error occurred during sign-in",
          });
        },
      },
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
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
