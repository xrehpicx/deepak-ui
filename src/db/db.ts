import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { userThreads } from "./schema";
import { sql } from "drizzle-orm";

const connectionString = process.env.AUTH_DRIZZLE_URL;

if (!connectionString) {
  throw new Error("AUTH_DRIZZLE_URL is not defined");
}

const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);

export async function getThreadFromDb(
  userId: string,
  url: string,
  threadId?: string
) {
  // check if thread for this user and url exists
  const thread = await db
    .selectDistinct()
    .from(userThreads)
    .where(
      sql`${userThreads.userId} = ${userId} and ${userThreads.url} = ${url}`
    );

  if (thread) {
    return thread;
  }

  return threadId
    ? await db
        .insert(userThreads)
        .values({
          threadId,
          userId,
          url,
        })
        .returning()
    : null;
}
