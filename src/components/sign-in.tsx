import { signIn } from "@/auth/auth";
import { CornerDownLeft } from "lucide-react";
import { Button } from "./ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        console.log(signIn);
        await signIn("google");
      }}
      className="flex gap-2 items-center justify-center"
    >
      <Button
        autoFocus
        size="lg"
        className="rounded-full flex items-center gap-2 font-semibold"
      >
        LOGIN WITH GOOGLE
      </Button>
      <div className="p-1 border flex items-center px-3 gap-1 border-primary/20 rounded-md">
        Enter <CornerDownLeft size={12} />
      </div>
    </form>
  );
}
