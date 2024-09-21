ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_discord_user_id_unique" UNIQUE("discord_user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_ltoken_v2_unique" UNIQUE("ltoken_v2");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_ltuid_v2_unique" UNIQUE("ltuid_v2");