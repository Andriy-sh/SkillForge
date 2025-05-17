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
import { updateUserId } from "@/lib/actions/user/updateUser";
import { useUserStore } from "@/lib/store/userStore";
import { userId, UserId } from "@/schemas/user";
import { User } from "@/schemas/User/User";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProfileSettings({ user }: { user: User }) {
  const form = useForm<UserId>({
    resolver: zodResolver(userId),
    defaultValues: {
      id: "",
    },
  });
  const updateStoreUserId = useUserStore((state) => state.updateUserId);
  const handleUpdateUserId = async (data: UserId) => {
    try {
      await updateUserId(user.id, data.id);
      updateStoreUserId(data.id);
      form.reset();
    } catch (error) {
      console.error("Error updating user ID:", error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateUserId)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input placeholder="New User ID" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit">Update User ID</button>
        </form>
      </Form>
    </div>
  );
}
