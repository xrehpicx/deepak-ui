import { boolean, pgTable, text, primaryKey } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    emailVerified: boolean("emailVerified").notNull(),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

// table to save a mapping of all user email to thread ids
export const userThreads = pgTable("user_thread", {
  userId: text("userId").notNull(),
  threadId: text("threadId").notNull(),
  url: text("url").notNull(),
});

// table to save user email to vector store id
export const userVectorStore = pgTable("user_vector_store", {
  userId: text("userId").notNull(),
  vectorStoreId: text("vectorStoreId").notNull(),
});
