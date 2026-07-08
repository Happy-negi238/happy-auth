ALTER TABLE "developers" ADD COLUMN "is_active" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "registered_apps" ADD COLUMN "developer_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "registered_apps" ADD CONSTRAINT "registered_apps_developer_id_developers_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "developers"("id") ON DELETE CASCADE;