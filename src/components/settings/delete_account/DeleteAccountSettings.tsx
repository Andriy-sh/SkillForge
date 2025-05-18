"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { useUserStore } from "@/lib/store/userStore";
import { signOut } from "next-auth/react";

export default function DeleteAccount() {
  const userId = useUserStore((state) => state.user?.id) ?? "";
  const handleDelete = async () => {
    try {
      signOut();
      await deleteUser(userId);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  return (
    <div className="bg-white flex flex-col border-1 p-6 border-black">
      <h1 className="text-2xl font-bold mb-4">Delete Account </h1>
      <p className="text-lg text-gray-600 mb-4">
        You can delete your account at any time. This action is irreversible and
        will permanently remove all your data from our servers.
      </p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="flex flex-col space-y-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-40"
            variant="outline"
          >
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={handleDelete}
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
