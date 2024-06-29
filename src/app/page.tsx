import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { loginUrl } from "@/lib/utils";
import { EnterIcon } from "@radix-ui/react-icons";
import { CornerDownLeft } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="flex my-auto gap-4 justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold">Deepak</h1>
          <span>Knowledge assistant</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <a className="flex items-center gap-3" href={loginUrl}>
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
        </a>
      </div>
    </main>
  );
}
