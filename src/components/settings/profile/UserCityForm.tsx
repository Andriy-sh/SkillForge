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
import { useUserStore } from "@/lib/store/userStore";
import { useState } from "react";
import { userCity, UserCity } from "@/schemas/user";
import { Textarea } from "@/components/ui/textarea";
import { updateUserCity } from "@/lib/actions/user/updateUser";

export default function UserCityForm() {
  const [isEditing, setIsEditing] = useState(false);
  const currentCity = useUserStore((state) => state.user?.city) ?? "";
  const currentUserId = useUserStore((state) => state.user?.id) ?? "";

  const form = useForm<UserCity>({
    resolver: zodResolver(userCity),
    defaultValues: { city: currentCity },
  });
  const updateStoreUserCity = useUserStore((state) => state.updateUserCity);
  const handleUpdate = async (data: { city: string }) => {
    try {
      await updateUserCity(currentUserId, data.city);
      updateStoreUserCity(data.city);
      setIsEditing(false);
      form.reset({ city: data.city });
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  return (
    <div className="max-w-md  bg-white rounded-xl ">
      <div className="flex flex-col gap-2">
        {!isEditing ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">City</span>
              <button
                type="button"
                className="text-blue-700 hover:underline text-md font-bold"
                onClick={() => setIsEditing(true)}
              >
                Change City
              </button>
            </div>
            <span className="text-lg text-gray-600">
              {currentCity || "No city set"}
            </span>
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Change City
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Lviv, Ukraine"
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    This city will be displayed on your profile.
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
                  form.reset({ city: currentCity });
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
