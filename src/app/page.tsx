import { auth } from "@/auth/auth";
import { SignIn } from "@/components/sign-in";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await auth();

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="flex my-auto gap-4 justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold">Deepak</h1>
          <span>Knowledge assistant</span>
        </div>
        <Separator orientation="vertical" className="h-12" />

        {session?.user ? (
          <div>
            <span>logged in as {session.user.name}</span>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </main>
  );
}
