import { z } from "zod";

import { issueSeveritySchema, issueTypeSchema, viewportTypeSchema } from "./enums";

export const scanConfigSchema = z.object({
  targetUrl: z.string().url(),
  maxPages: z.number().int().min(1).max(100).default(10),
  maxDepth: z.number().int().min(0).max(10).default(2),
  pageTimeoutMs: z.number().int().min(1000).max(120000).default(10000),
  viewports: z.array(viewportTypeSchema).min(1).default(["desktop", "mobile"]),
  includeScreenshots: z.boolean().default(true),
});

export type ScanConfig = z.infer<typeof scanConfigSchema>;

export const scanPageResultSchema = z.object({
  url: z.string().url(),
  finalUrl: z.string().url().nullable().optional(),
  statusCode: z.number().int().min(100).max(599).nullable().optional(),
  title: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  loadTimeMs: z.number().int().nonnegative().nullable().optional(),
  consoleErrorCount: z.number().int().nonnegative().default(0),
  failedRequestCount: z.number().int().nonnegative().default(0),
  brokenLinkCount: z.number().int().nonnegative().default(0),
  hasMobileHorizontalOverflow: z.boolean().default(false),
  issueCount: z.number().int().nonnegative().default(0),
  screenshotAssetIds: z.array(z.string().uuid()).default([]),
});

export type ScanPageResult = z.infer<typeof scanPageResultSchema>;

export const issueEvidencePayloadSchema = z
  .object({
    pageUrl: z.string().url().optional(),
    message: z.string().optional(),
    selector: z.string().optional(),
    viewport: viewportTypeSchema.optional(),
    statusCode: z.number().int().min(100).max(599).optional(),
    requestUrl: z.string().url().optional(),
    responseStatus: z.number().int().min(100).max(599).optional(),
    consoleText: z.string().optional(),
    linkUrl: z.string().optional(),
    assetIds: z.array(z.string().uuid()).default([]),
    raw: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export type IssueEvidencePayload = z.infer<typeof issueEvidencePayloadSchema>;

export const scanIssueSchema = z.object({
  type: issueTypeSchema,
  severity: issueSeveritySchema,
  title: z.string().min(1),
  affectedUrl: z.string().min(1),
  evidence: issueEvidencePayloadSchema,
  fingerprint: z.string().min(1).optional(),
});

export type ScanIssue = z.infer<typeof scanIssueSchema>;
