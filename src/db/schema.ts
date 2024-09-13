import { pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: varchar("username").notNull(),
  discordUserId: varchar("discord_user_id").notNull(),
  ltokenV2: varchar("ltoken_v2").notNull(),
  ltuidV2: varchar("ltuid_v2").notNull(),
});

export type insertUser = typeof usersTable.$inferInsert;
