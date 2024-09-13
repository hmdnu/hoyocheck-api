CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"discord_user_id" varchar NOT NULL,
	"ltoken_v2" varchar NOT NULL,
	"ltuid_v2" varchar NOT NULL
);
