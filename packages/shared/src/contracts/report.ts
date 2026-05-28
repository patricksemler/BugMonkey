import { z } from "zod";

import { issueSeveritySchema, reportModeSchema, reportOutputFormatSchema } from "./enums";
import { scanIssueSchema } from "./scan";

export const severityCountsSchema = z.object({
  critical: z.number().int().nonnegative().default(0),
  high: z.number().int().nonnegative().default(0),
  medium: z.number().int().nonnegative().default(0),
  low: z.number().int().nonnegative().default(0),
});

export const reportOutputPayloadSchema = z.object({
  mode: reportModeSchema,
  format: reportOutputFormatSchema,
  score: z.number().int().min(0).max(100).nullable().optional(),
  summary: z.string().optional(),
  severityCounts: severityCountsSchema,
  launchBlockers: z.array(z.string()).default([]),
  issues: z.array(scanIssueSchema).default([]),
  generatedAt: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export type ReportOutputPayload = z.infer<typeof reportOutputPayloadSchema>;

export const reportIssueSummarySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  severity: issueSeveritySchema,
  affectedUrl: z.string().min(1),
  reproductionSteps: z.array(z.string()).default([]),
  suggestedFix: z.string().optional(),
  evidenceAssetIds: z.array(z.string().uuid()).default([]),
});

export type ReportIssueSummary = z.infer<typeof reportIssueSummarySchema>;
