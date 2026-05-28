import { sql } from "drizzle-orm";
import {
  foreignKey,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

import {
  evidenceAssetTypeValues,
  issueSeverityValues,
  issueTypeValues,
  reportModeValues,
  reportOutputFormatValues,
  scanEventTypeValues,
  scanStatusValues,
  viewportTypeValues,
} from "../contracts/constants";
import type {
  IssueEvidencePayload,
  ReportOutputPayload,
  ScanConfig,
  ScanPageResult,
} from "../contracts";

const jsonbObjectDefault = sql`'{}'::jsonb`;

export const scanStatusEnum = pgEnum("scan_status", scanStatusValues);
export const issueTypeEnum = pgEnum("issue_type", issueTypeValues);
export const issueSeverityEnum = pgEnum("issue_severity", issueSeverityValues);
export const reportModeEnum = pgEnum("report_mode", reportModeValues);
export const viewportTypeEnum = pgEnum("viewport_type", viewportTypeValues);
export const evidenceAssetTypeEnum = pgEnum("evidence_asset_type", evidenceAssetTypeValues);
export const scanEventTypeEnum = pgEnum("scan_event_type", scanEventTypeValues);
export const reportOutputFormatEnum = pgEnum(
  "report_output_format",
  reportOutputFormatValues,
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    name: text("name").notNull(),
    targetUrl: text("target_url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [authUsers.id],
      name: "projects_user_id_auth_users_id_fk",
    }).onDelete("cascade"),
    index("projects_user_id_idx").on(table.userId),
    index("projects_created_at_idx").on(table.createdAt),
  ],
).enableRLS();

export const scans = pgTable(
  "scans",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    targetUrl: text("target_url").notNull(),
    status: scanStatusEnum("status").notNull().default("queued"),
    reportMode: reportModeEnum("report_mode").notNull().default("rule_based"),
    config: jsonb("config").$type<ScanConfig>().notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    failedReason: text("failed_reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("scans_project_id_idx").on(table.projectId),
    index("scans_status_idx").on(table.status),
    index("scans_created_at_idx").on(table.createdAt),
  ],
).enableRLS();

export const scanPages = pgTable(
  "scan_pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scanId: uuid("scan_id")
      .notNull()
      .references(() => scans.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    finalUrl: text("final_url"),
    statusCode: integer("status_code"),
    title: text("title"),
    loadTimeMs: integer("load_time_ms"),
    result: jsonb("result").$type<ScanPageResult>().notNull().default(jsonbObjectDefault),
  },
  (table) => [index("scan_pages_scan_id_idx").on(table.scanId), index("scan_pages_url_idx").on(table.url)],
).enableRLS();

export const issues = pgTable(
  "issues",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scanId: uuid("scan_id")
      .notNull()
      .references(() => scans.id, { onDelete: "cascade" }),
    pageId: uuid("page_id").references(() => scanPages.id, { onDelete: "set null" }),
    type: issueTypeEnum("type").notNull(),
    severity: issueSeverityEnum("severity").notNull(),
    title: text("title").notNull(),
    affectedUrl: text("affected_url").notNull(),
    evidence: jsonb("evidence")
      .$type<IssueEvidencePayload>()
      .notNull()
      .default(jsonbObjectDefault),
    fingerprint: text("fingerprint"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("issues_scan_id_idx").on(table.scanId),
    index("issues_page_id_idx").on(table.pageId),
    index("issues_severity_idx").on(table.severity),
    index("issues_type_idx").on(table.type),
    uniqueIndex("issues_scan_id_fingerprint_idx").on(table.scanId, table.fingerprint),
  ],
).enableRLS();

export const evidenceAssets = pgTable(
  "evidence_assets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scanId: uuid("scan_id")
      .notNull()
      .references(() => scans.id, { onDelete: "cascade" }),
    pageId: uuid("page_id").references(() => scanPages.id, { onDelete: "set null" }),
    issueId: uuid("issue_id").references(() => issues.id, { onDelete: "set null" }),
    type: evidenceAssetTypeEnum("type").notNull(),
    viewport: viewportTypeEnum("viewport"),
    storageBucket: text("storage_bucket"),
    storagePath: text("storage_path"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default(jsonbObjectDefault),
    capturedAt: timestamp("captured_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    index("evidence_assets_scan_id_idx").on(table.scanId),
    index("evidence_assets_issue_id_idx").on(table.issueId),
    index("evidence_assets_type_idx").on(table.type),
  ],
).enableRLS();

export const scanEvents = pgTable(
  "scan_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scanId: uuid("scan_id")
      .notNull()
      .references(() => scans.id, { onDelete: "cascade" }),
    pageId: uuid("page_id").references(() => scanPages.id, { onDelete: "set null" }),
    type: scanEventTypeEnum("type").notNull(),
    message: text("message"),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default(jsonbObjectDefault),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("scan_events_scan_id_idx").on(table.scanId),
    index("scan_events_type_idx").on(table.type),
    index("scan_events_created_at_idx").on(table.createdAt),
  ],
).enableRLS();

export const reportOutputs = pgTable(
  "report_outputs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scanId: uuid("scan_id")
      .notNull()
      .references(() => scans.id, { onDelete: "cascade" }),
    mode: reportModeEnum("mode").notNull(),
    format: reportOutputFormatEnum("format").notNull(),
    score: integer("score"),
    payload: jsonb("payload").$type<ReportOutputPayload>().notNull(),
    generatedAt: timestamp("generated_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    uniqueIndex("report_outputs_scan_id_mode_format_idx").on(
      table.scanId,
      table.mode,
      table.format,
    ),
  ],
).enableRLS();
