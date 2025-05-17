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
import { userId, UserId } from "@/schemas/user";
import { updateUserId } from "@/lib/actions/user/updateUser";
import { useUserStore } from "@/lib/store/userStore";
import { useState } from "react";

export default function UserIdForm() {
  const [isEditing, setIsEditing] = useState(false);
  const currentUserId = useUserStore((state) => state.user?.id) ?? "";
  const updateStoreUserId = useUserStore((state) => state.updateUserId);

  const form = useForm<UserId>({
    resolver: zodResolver(userId),
    defaultValues: { id: currentUserId },
  });

  const handleUpdateUserId = async (data: UserId) => {
    try {
      await updateUserId(currentUserId, data.id);
      updateStoreUserId(data.id);
      setIsEditing(false);
      form.reset({ id: data.id });
    } catch (error) {
      console.error("Error updating user ID:", error);
    }
  };

  return (
    <div className="max-w-md bg-white rounded-xl  ">
      <div className="flex flex-col gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">User ID</span>
              <button
                type="button"
                className="text-blue-700 hover:underline text-md font-bold"
                onClick={() => setIsEditing(true)}
              >
                Change User ID
              </button>
            </div>
            <span className="text-lg text-gray-600">{currentUserId}</span>
          </>
        ) : null}
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateUserId)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Change User ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new user ID"
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    This is your public display id.
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
                  form.reset({ id: currentUserId });
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
