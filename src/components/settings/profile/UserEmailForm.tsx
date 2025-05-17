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
import { userEmail, UserEmail } from "@/schemas/user";
import { updateUserEmail } from "@/lib/actions/user/updateUser";
import { useUserStore } from "@/lib/store/userStore";
import { useState } from "react";

export default function UserEmailForm() {
  const [isEditing, setIsEditing] = useState(false);
  const currentEmail = useUserStore((state) => state.user?.email) ?? "";
  const currentUserId = useUserStore((state) => state.user?.id) ?? "";

  const form = useForm<UserEmail>({
    resolver: zodResolver(userEmail),
    defaultValues: { email: currentEmail },
  });

  const handleUpdate = async (data: UserEmail) => {
    try {
      await updateUserEmail(currentUserId, data.email);
      setIsEditing(false);
      form.reset({ email: data.email });
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  return (
    <div className="max-w-md bg-white rounded-xl">
      <div className="flex flex-col gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">Email</span>
              <button
                type="button"
                className="text-blue-700 hover:underline text-md font-bold"
                onClick={() => setIsEditing(true)}
              >
                Change Email
              </button>
            </div>
            <span className="text-lg text-gray-600">{currentEmail}</span>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Change Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new email"
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    This email will be used for your account.
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
                  form.reset({ email: currentEmail });
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
