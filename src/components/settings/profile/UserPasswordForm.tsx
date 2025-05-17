"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userPassword, UserPassword } from "@/schemas/user";
import { updateUserPassword } from "@/lib/actions/user/updateUser";
import { useUserStore } from "@/lib/store/userStore";
import { useState } from "react";

export default function UserPasswordForm() {
  const [isEditing, setIsEditing] = useState(false);
  const currentUserId = useUserStore((state) => state.user?.id) ?? "";

  const form = useForm<UserPassword>({
    resolver: zodResolver(userPassword),
    defaultValues: { password: "", oldPassword: "" },
  });

  const handleUpdate = async (data: UserPassword) => {
    try {
      await updateUserPassword(currentUserId, data.oldPassword, data.password);
      setIsEditing(false);
      form.reset();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="max-w-md bg-white rounded-xl">
      <div className="flex flex-col gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">Password</span>
              <button
                type="button"
                className="text-blue-700 hover:underline text-md font-bold"
                onClick={() => setIsEditing(true)}
              >
                Change Password
              </button>
            </div>
            <span className="text-lg text-gray-600">********</span>
          </>
        ) : null}
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Change Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    Make sure it&apos;s strong.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter old password"
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    Enter your current password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-gray-300"
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
