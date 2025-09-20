ALTER TABLE "job_info" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "job_info" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interviews" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "interviews" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "id" SET NOT NULL;