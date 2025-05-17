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
import { userName, UserName } from "@/schemas/user";
import { updateUserName } from "@/lib/actions/user/updateUser";
import { useUserStore } from "@/lib/store/userStore";
import { useState } from "react";

export default function UserNameForm() {
  const [isEditing, setIsEditing] = useState(false);
  const currentName = useUserStore((state) => state.user?.name) ?? "";
  const currentUserId = useUserStore((state) => state.user?.id) ?? "";

  const form = useForm<UserName>({
    resolver: zodResolver(userName),
    defaultValues: { name: currentName },
  });
  const updateStoreUserName = useUserStore((state) => state.updateUserName);
  const handleUpdate = async (data: UserName) => {
    try {
      await updateUserName(currentUserId, data.name);
      updateStoreUserName(data.name);
      setIsEditing(false);
      form.reset({ name: data.name });
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  return (
    <div className="max-w-md  bg-white rounded-xl ">
      <div className="flex flex-col gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">Name</span>
              <button
                type="button"
                className="text-blue-700 hover:underline text-md font-bold"
                onClick={() => setIsEditing(true)}
              >
                Change Name
              </button>
            </div>
            <span className="text-lg text-gray-600">{currentName}</span>
          </>
        ) : null}
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-6 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Change Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new name"
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    This name will be displayed on your profile.
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
                  form.reset({ name: currentName });
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
