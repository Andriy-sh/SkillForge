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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserBio } from "@/lib/actions/user/updateUser";
import { useUserStore } from "@/lib/store/userStore";
import { useState } from "react";
import { userBio, UserBio } from "@/schemas/user";
import { Textarea } from "@/components/ui/textarea";

export default function UserBioForm() {
  const [isEditing, setIsEditing] = useState(false);
  const currentBio = useUserStore((state) => state.user?.bio) ?? "";
  const currentUserId = useUserStore((state) => state.user?.id) ?? "";

  const form = useForm<UserBio>({
    resolver: zodResolver(userBio),
    defaultValues: { bio: currentBio },
  });
  const updateStoreUserBio = useUserStore((state) => state.updateUserBio);
  const handleUpdate = async (data: { bio: string }) => {
    try {
      await updateUserBio(currentUserId, data.bio);
      updateStoreUserBio(data.bio);
      setIsEditing(false);
      form.reset({ bio: data.bio });
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div className="max-w-md  bg-white rounded-xl ">
      <div className="flex flex-col gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">Bio</span>
              <button
                type="button"
                className="text-blue-700 hover:underline text-md font-bold"
                onClick={() => setIsEditing(true)}
              >
                Change Bio
              </button>
            </div>
            <span className="text-lg text-gray-600">{currentBio}</span>
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
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Change Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your new bio"
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    This bio will be displayed on your profile.
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
                  form.reset({ bio: currentBio });
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
