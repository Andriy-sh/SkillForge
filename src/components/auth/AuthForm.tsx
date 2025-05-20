"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "./GoogleLoginButton";
import { GithubLogin } from "./GithubLoginButton";
import { signUp } from "@/lib/actions/auth/signUp";
import { redirect } from "next/navigation";
import {
  authSchema,
  AuthSchema,
  signupSchema,
  SignupSchema,
} from "@/schemas/auth";
import { Facebook, Gitlab } from "lucide-react";
import { signInAction } from "@/lib/actions/auth/signIn";

type Props = {
  isSignup: boolean;
};

export default function FormElement({ isSignup }: Props) {
  const form = useForm<AuthSchema | SignupSchema>({
    resolver: zodResolver(isSignup ? signupSchema : authSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isSignup ? { name: "" } : {}),
    },
  });

  const handleSubmit = async (data: AuthSchema | SignupSchema) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    if ("name" in data) {
      formData.append("name", data.name);
    }
    if (isSignup) {
      try {
        await signUp(formData);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "An error occurred.";
        if (message === "User already exists") {
          form.setError("email", {
            type: "manual",
            message: "User with this email already exists.",
          });
        }
      }
    } else {
      const result = await signInAction(formData);

      if (!result?.success) {
        form.setError("password", {
          type: "manual",
          message: result?.message || "Incorrect email or password.",
        });
        return;
      }
      window.location.reload();
      redirect("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[93vh] bg-background px-4">
      <div className="w-full max-w-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Get started for free
        </h1>
        <p className="text-sm text-gray-700 mb-4">* Required</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {isSignup && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#3713f3] hover:bg-[#250d9e] text-white py-2 rounded-md text-base font-semibold"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By signing up for SkillForge, you agree to SkillForge&apos;s
          <a href="#" className="text-blue-600 underline">
            Terms of Service
          </a>
          &
          <a href="#" className="text-blue-600 underline">
            Privacy Policy
          </a>
          .
        </p>

        <div className="my-4 text-center font-medium">
          {isSignup ? "Or sign up using:" : "Or sign in using:"}
        </div>

        <div className="grid grid-cols-4 h-20   justify-center items-center gap-2">
          <GoogleLogin />

          <GithubLogin />
          <Facebook size={40} />
          <Gitlab size={40} />
        </div>

        <p className="text-sm text-center text-gray-700 mt-6">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 underline">
                Log in
              </a>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-600 underline">
                Sign Up
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
