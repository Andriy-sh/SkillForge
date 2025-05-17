import FormElement from "../../../components/auth/AuthForm";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div>
      <FormElement isSignup={true} />
    </div>
  );
}
