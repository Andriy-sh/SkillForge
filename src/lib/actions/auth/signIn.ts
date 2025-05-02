import { signIn } from "next-auth/react";

export const signInAction = async (formData: FormData) => {
  const result = await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirect: false,
  });

  if (result?.error) {
    return { success: false, message: "Incorrect email or password." };
  }

  return { success: true };
};
