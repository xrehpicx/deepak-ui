import { auth } from "@/auth/auth";
import fs from "fs";
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import OpenAI from "openai";

const openai = new OpenAI();

export const runtime = 'nodejs'

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

if (!process.env.ASSISTANT_ID) {
  throw new Error("ASSISTANT_ID is not set");
}

export async function GET(request: Request) {
  const token = await auth();

  return NextResponse.json({ token });
}

export async function POST(request: Request) {
  const json = await request.json();
  const url = json.url;
  const user_query = json.user_query;
  const image_url = json.image_url;

  let threads_id = await kv.get<string>(url);

  if (!threads_id) {
    const thread = await openai.beta.threads.create();
    threads_id = thread.id;
    // get context and add message here
    await kv.set(url, threads_id);
  }

  const thread = await openai.beta.threads.retrieve(threads_id);

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: image_url
      ? [
          {
            type: "image_url",
            image_url: {
              url: image_url as string,
            },
          },
          {
            type: "text",
            text: user_query,
          },
        ]
      : user_query,
  });

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: process.env.ASSISTANT_ID!,
  });

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    console.log(messages);
    return NextResponse.json({ message: messages.data[0] });
  }
}

// create example curl post call for the above
// curl -X POST -H "Content-Type: application/json" -d '{"url":"https://example.com","user_query":"What is the weather today?"}' http://localhost:3000/api/ai
