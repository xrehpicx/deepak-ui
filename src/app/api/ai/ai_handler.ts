import { getThreadFromDb } from "@/db/db";
import OpenAI from "openai";

const openai = new OpenAI();

export async function getThread(url: string, email: string) {
  const dbthread = await getThreadFromDb(email, url);

  if (!dbthread) {
    const thread = await openai.beta.threads.create();
    console.log("created thread", thread.id);
    await getThreadFromDb(email, url, thread.id);
  }
}
