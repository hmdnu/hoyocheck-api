ALTER TABLE "users" DROP CONSTRAINT "users_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_discord_user_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_ltoken_v2_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_ltuid_v2_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "unique_id" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "unique_username" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "unique_discord_user_id" UNIQUE("discord_user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "unique_ltoken_v2" UNIQUE("ltoken_v2");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "unique_ltuid_v2" UNIQUE("ltuid_v2");