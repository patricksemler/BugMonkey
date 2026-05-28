import { z } from "zod";

import {
  evidenceAssetTypeValues,
  issueSeverityValues,
  issueTypeValues,
  reportModeValues,
  reportOutputFormatValues,
  scanEventTypeValues,
  scanStatusValues,
  viewportTypeValues,
} from "./constants";

export const scanStatusSchema = z.enum(scanStatusValues);
export type ScanStatus = z.infer<typeof scanStatusSchema>;

export const issueTypeSchema = z.enum(issueTypeValues);
export type IssueType = z.infer<typeof issueTypeSchema>;

export const issueSeveritySchema = z.enum(issueSeverityValues);
export type IssueSeverity = z.infer<typeof issueSeveritySchema>;

export const reportModeSchema = z.enum(reportModeValues);
export type ReportMode = z.infer<typeof reportModeSchema>;

export const viewportTypeSchema = z.enum(viewportTypeValues);
export type ViewportType = z.infer<typeof viewportTypeSchema>;

export const evidenceAssetTypeSchema = z.enum(evidenceAssetTypeValues);
export type EvidenceAssetType = z.infer<typeof evidenceAssetTypeSchema>;

export const scanEventTypeSchema = z.enum(scanEventTypeValues);
export type ScanEventType = z.infer<typeof scanEventTypeSchema>;

export const reportOutputFormatSchema = z.enum(reportOutputFormatValues);
export type ReportOutputFormat = z.infer<typeof reportOutputFormatSchema>;
