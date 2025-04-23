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
import {
  authSchema,
  AuthSchema,
  signupSchema,
  SignupSchema,
} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { GoogleSignIn } from "./googleSignIn";

type Props = {
  isSignup: boolean;
  onSubmit?: (data: AuthSchema | SignupSchema) => Promise<void>;
};

export default function FormElement({ isSignup, onSubmit }: Props) {
  const form = useForm<AuthSchema | SignupSchema>({
    resolver: zodResolver(isSignup ? signupSchema : authSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isSignup ? { name: "" } : {}),
    },
  });

  const handleSubmit = async (data: AuthSchema | SignupSchema) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        console.log("Form data:", Object.fromEntries(formData));
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="w-full  max-w-md mx-auto p-6">
      <div className="flex justify-center items-center">
        <GoogleSignIn
          text={isSignup ? "Sign Up with Google" : "Log In with Google"}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {isSignup && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Name..." />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="Email..." />
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
                  <Input type="password" {...field} placeholder="Password..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
