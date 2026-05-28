CREATE TYPE "public"."evidence_asset_type" AS ENUM('screenshot', 'console_log', 'network_log', 'trace', 'html_snapshot', 'report_export');--> statement-breakpoint
CREATE TYPE "public"."issue_severity" AS ENUM('critical', 'high', 'medium', 'low');--> statement-breakpoint
CREATE TYPE "public"."issue_type" AS ENUM('PAGE_LOAD_FAILED', 'HTTP_ERROR_STATUS', 'FAILED_NETWORK_REQUEST', 'CONSOLE_ERROR', 'BROKEN_LINK', 'BUTTON_INTERACTION_ERROR', 'FORM_SUBMISSION_ERROR_SAFE_ONLY', 'MISSING_TITLE', 'MISSING_META_DESCRIPTION', 'IMAGE_MISSING_ALT', 'MOBILE_HORIZONTAL_OVERFLOW', 'SLOW_PAGE_LOAD_WARNING');--> statement-breakpoint
CREATE TYPE "public"."report_mode" AS ENUM('rule_based', 'mock', 'llm_enhanced');--> statement-breakpoint
CREATE TYPE "public"."report_output_format" AS ENUM('json', 'markdown');--> statement-breakpoint
CREATE TYPE "public"."scan_event_type" AS ENUM('scan_queued', 'scan_started', 'page_started', 'page_completed', 'page_failed', 'issue_detected', 'asset_captured', 'scan_completed', 'scan_failed');--> statement-breakpoint
CREATE TYPE "public"."scan_status" AS ENUM('queued', 'running', 'completed', 'failed', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."viewport_type" AS ENUM('desktop', 'mobile');--> statement-breakpoint
CREATE TABLE "evidence_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scan_id" uuid NOT NULL,
	"page_id" uuid,
	"issue_id" uuid,
	"type" "evidence_asset_type" NOT NULL,
	"viewport" "viewport_type",
	"storage_bucket" text,
	"storage_path" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"captured_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "evidence_assets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "issues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scan_id" uuid NOT NULL,
	"page_id" uuid,
	"type" "issue_type" NOT NULL,
	"severity" "issue_severity" NOT NULL,
	"title" text NOT NULL,
	"affected_url" text NOT NULL,
	"evidence" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"fingerprint" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "issues" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"target_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"archived_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "report_outputs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scan_id" uuid NOT NULL,
	"mode" "report_mode" NOT NULL,
	"format" "report_output_format" NOT NULL,
	"score" integer,
	"payload" jsonb NOT NULL,
	"generated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "report_outputs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "scan_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scan_id" uuid NOT NULL,
	"page_id" uuid,
	"type" "scan_event_type" NOT NULL,
	"message" text,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "scan_events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "scan_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scan_id" uuid NOT NULL,
	"url" text NOT NULL,
	"final_url" text,
	"status_code" integer,
	"title" text,
	"load_time_ms" integer,
	"result" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "scan_pages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "scans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"target_url" text NOT NULL,
	"status" "scan_status" DEFAULT 'queued' NOT NULL,
	"report_mode" "report_mode" DEFAULT 'rule_based' NOT NULL,
	"config" jsonb NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"failed_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "scans" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "evidence_assets" ADD CONSTRAINT "evidence_assets_scan_id_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."scans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_assets" ADD CONSTRAINT "evidence_assets_page_id_scan_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."scan_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_assets" ADD CONSTRAINT "evidence_assets_issue_id_issues_id_fk" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_scan_id_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."scans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_page_id_scan_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."scan_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_outputs" ADD CONSTRAINT "report_outputs_scan_id_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."scans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scan_events" ADD CONSTRAINT "scan_events_scan_id_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."scans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scan_events" ADD CONSTRAINT "scan_events_page_id_scan_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."scan_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scan_pages" ADD CONSTRAINT "scan_pages_scan_id_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."scans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scans" ADD CONSTRAINT "scans_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "evidence_assets_scan_id_idx" ON "evidence_assets" USING btree ("scan_id");--> statement-breakpoint
CREATE INDEX "evidence_assets_issue_id_idx" ON "evidence_assets" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "evidence_assets_type_idx" ON "evidence_assets" USING btree ("type");--> statement-breakpoint
CREATE INDEX "issues_scan_id_idx" ON "issues" USING btree ("scan_id");--> statement-breakpoint
CREATE INDEX "issues_page_id_idx" ON "issues" USING btree ("page_id");--> statement-breakpoint
CREATE INDEX "issues_severity_idx" ON "issues" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "issues_type_idx" ON "issues" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "issues_scan_id_fingerprint_idx" ON "issues" USING btree ("scan_id","fingerprint");--> statement-breakpoint
CREATE INDEX "projects_user_id_idx" ON "projects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "report_outputs_scan_id_mode_format_idx" ON "report_outputs" USING btree ("scan_id","mode","format");--> statement-breakpoint
CREATE INDEX "scan_events_scan_id_idx" ON "scan_events" USING btree ("scan_id");--> statement-breakpoint
CREATE INDEX "scan_events_type_idx" ON "scan_events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "scan_events_created_at_idx" ON "scan_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "scan_pages_scan_id_idx" ON "scan_pages" USING btree ("scan_id");--> statement-breakpoint
CREATE INDEX "scan_pages_url_idx" ON "scan_pages" USING btree ("url");--> statement-breakpoint
CREATE INDEX "scans_project_id_idx" ON "scans" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "scans_status_idx" ON "scans" USING btree ("status");--> statement-breakpoint
CREATE INDEX "scans_created_at_idx" ON "scans" USING btree ("created_at");--> statement-breakpoint
CREATE POLICY "Users can select own projects"
ON "projects"
FOR SELECT
TO authenticated
USING ((select auth.uid()) IS NOT NULL AND (select auth.uid()) = "user_id");--> statement-breakpoint
CREATE POLICY "Users can insert own projects"
ON "projects"
FOR INSERT
TO authenticated
WITH CHECK ((select auth.uid()) IS NOT NULL AND (select auth.uid()) = "user_id");--> statement-breakpoint
CREATE POLICY "Users can update own projects"
ON "projects"
FOR UPDATE
TO authenticated
USING ((select auth.uid()) IS NOT NULL AND (select auth.uid()) = "user_id")
WITH CHECK ((select auth.uid()) IS NOT NULL AND (select auth.uid()) = "user_id");--> statement-breakpoint
CREATE POLICY "Users can delete own projects"
ON "projects"
FOR DELETE
TO authenticated
USING ((select auth.uid()) IS NOT NULL AND (select auth.uid()) = "user_id");--> statement-breakpoint
CREATE POLICY "Users can select scans for own projects"
ON "scans"
FOR SELECT
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "projects"
		WHERE "projects"."id" = "scans"."project_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can insert scans for own projects"
ON "scans"
FOR INSERT
TO authenticated
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "projects"
		WHERE "projects"."id" = "scans"."project_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can update scans for own projects"
ON "scans"
FOR UPDATE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "projects"
		WHERE "projects"."id" = "scans"."project_id"
		AND "projects"."user_id" = (select auth.uid())
	)
)
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "projects"
		WHERE "projects"."id" = "scans"."project_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can delete scans for own projects"
ON "scans"
FOR DELETE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "projects"
		WHERE "projects"."id" = "scans"."project_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can select pages for own scans"
ON "scan_pages"
FOR SELECT
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_pages"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can insert pages for own scans"
ON "scan_pages"
FOR INSERT
TO authenticated
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_pages"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can update pages for own scans"
ON "scan_pages"
FOR UPDATE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_pages"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
)
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_pages"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can delete pages for own scans"
ON "scan_pages"
FOR DELETE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_pages"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can select issues for own scans"
ON "issues"
FOR SELECT
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "issues"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can insert issues for own scans"
ON "issues"
FOR INSERT
TO authenticated
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "issues"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can update issues for own scans"
ON "issues"
FOR UPDATE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "issues"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
)
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "issues"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can delete issues for own scans"
ON "issues"
FOR DELETE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "issues"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can select evidence assets for own scans"
ON "evidence_assets"
FOR SELECT
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "evidence_assets"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can insert evidence assets for own scans"
ON "evidence_assets"
FOR INSERT
TO authenticated
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "evidence_assets"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can update evidence assets for own scans"
ON "evidence_assets"
FOR UPDATE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "evidence_assets"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
)
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "evidence_assets"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can delete evidence assets for own scans"
ON "evidence_assets"
FOR DELETE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "evidence_assets"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can select scan events for own scans"
ON "scan_events"
FOR SELECT
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_events"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can insert scan events for own scans"
ON "scan_events"
FOR INSERT
TO authenticated
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_events"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can update scan events for own scans"
ON "scan_events"
FOR UPDATE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_events"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
)
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_events"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can delete scan events for own scans"
ON "scan_events"
FOR DELETE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "scan_events"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can select report outputs for own scans"
ON "report_outputs"
FOR SELECT
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "report_outputs"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can insert report outputs for own scans"
ON "report_outputs"
FOR INSERT
TO authenticated
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "report_outputs"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can update report outputs for own scans"
ON "report_outputs"
FOR UPDATE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "report_outputs"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
)
WITH CHECK (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "report_outputs"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);--> statement-breakpoint
CREATE POLICY "Users can delete report outputs for own scans"
ON "report_outputs"
FOR DELETE
TO authenticated
USING (
	(select auth.uid()) IS NOT NULL
	AND EXISTS (
		SELECT 1 FROM "scans"
		INNER JOIN "projects" ON "projects"."id" = "scans"."project_id"
		WHERE "scans"."id" = "report_outputs"."scan_id"
		AND "projects"."user_id" = (select auth.uid())
	)
);
