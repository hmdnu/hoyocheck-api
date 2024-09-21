import { pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: varchar("username").notNull().unique("unique_username"),
  discordUserId: varchar("discord_user_id").notNull().unique("unique_discord_user_id"),
  ltokenV2: varchar("ltoken_v2").notNull().unique("unique_ltoken_v2"),
  ltuidV2: varchar("ltuid_v2").notNull().unique("unique_ltuid_v2"),
});

export type insertUser = typeof usersTable.$inferInsert;
