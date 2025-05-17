import FormElement from "../../../components/auth/AuthForm";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div>
      <FormElement isSignup={false} />
    </div>
  );
}
