import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/forms/auth";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

type SignUpFormProps = {
  isLoading?: boolean;
  onSignUp: (data: z.infer<typeof signUpSchema>) => void;
};

export default function SignUpForm(props: SignUpFormProps) {
  const form = useFormContext<z.infer<typeof signUpSchema>>();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  return (
    <form
      onSubmit={form.handleSubmit(props.onSignUp)}
      className="flex h-full w-full flex-col justify-center gap-4"
    >
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="johndoe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="john_doe@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Password"
                  type={showPassword.password ? "text" : "password"}
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hover:text-foreground absolute top-0 right-0 hover:bg-transparent"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                >
                  {showPassword.password ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Confirm Password"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hover:text-foreground absolute top-0 right-0 hover:bg-transparent"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                >
                  {showPassword.confirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full" disabled={props.isLoading}>
        {props.isLoading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
            <span>Signing up...</span>
          </>
        ) : (
          <span>Sign Up</span>
        )}
      </Button>
    </form>
  );
}
