import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ShortcutProvider } from "./shortcut-handler";
import { SessionProvider } from "next-auth/react";

const inter = DM_Sans({ subsets: ["latin"], weight: ["400", "800", "600"] });

export const metadata: Metadata = {
  title: "Deepak",
  description: "Dikshas bro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <SessionProvider>
          <ShortcutProvider>{children}</ShortcutProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
