import { integer, pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

export const verificationCodesTable = pgTable("verification_codes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  code: varchar({ length: 6 }).notNull(),
  sender_email: varchar({ length: 255 }).notNull(),
  is_verificated: boolean().default(false).notNull(),
  expires_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  user_id: integer().notNull().references(() => usersTable.id),
});