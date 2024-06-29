"use client";
import { createContext, PropsWithChildren, useEffect } from "react";
import Mousetrap from "mousetrap";
import { login } from "@/lib/utils";

const ShortcutContext = createContext(null);

export function ShortcutProvider({ children }: PropsWithChildren<{}>) {
  useEffect(() => {
    const m = new Mousetrap();
    m.bind("enter", () => {
      console.log("Logging in");
      login();
    });
    return () => {
      m.reset();
    };
  }, []);
  return (
    <ShortcutContext.Provider value={null}>{children}</ShortcutContext.Provider>
  );
}
