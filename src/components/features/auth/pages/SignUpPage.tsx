"use client";

import AuthLayout from "@/components/features/auth/components/AuthLayout";
import { SignUpForm } from "@/components/features/auth/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpSchema } from "@/forms/auth";
import { authClient } from "@/lib/auth.client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSignUp(data: z.infer<typeof signUpSchema>) {
    authClient.signUp.email(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          form.reset();
          setIsLoading(false);
          toast.success("Sign up successful!");
          router.push("/home");
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
        <div className="mx-auto my-auto flex h-full max-h-5/6 w-full max-w-md flex-col items-center justify-between">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-balance">
              Create an account to get started
            </p>
          </div>
          <Form {...form}>
            <SignUpForm onSignUp={onSignUp} isLoading={isLoading} />
          </Form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
