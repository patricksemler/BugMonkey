export const scanStatusValues = [
  "queued",
  "running",
  "completed",
  "failed",
  "canceled",
] as const;

export const issueTypeValues = [
  "PAGE_LOAD_FAILED",
  "HTTP_ERROR_STATUS",
  "FAILED_NETWORK_REQUEST",
  "CONSOLE_ERROR",
  "BROKEN_LINK",
  "BUTTON_INTERACTION_ERROR",
  "FORM_SUBMISSION_ERROR_SAFE_ONLY",
  "MISSING_TITLE",
  "MISSING_META_DESCRIPTION",
  "IMAGE_MISSING_ALT",
  "MOBILE_HORIZONTAL_OVERFLOW",
  "SLOW_PAGE_LOAD_WARNING",
] as const;

export const issueSeverityValues = ["critical", "high", "medium", "low"] as const;

export const reportModeValues = ["rule_based", "mock", "llm_enhanced"] as const;

export const viewportTypeValues = ["desktop", "mobile"] as const;

export const evidenceAssetTypeValues = [
  "screenshot",
  "console_log",
  "network_log",
  "trace",
  "html_snapshot",
  "report_export",
] as const;

export const scanEventTypeValues = [
  "scan_queued",
  "scan_started",
  "page_started",
  "page_completed",
  "page_failed",
  "issue_detected",
  "asset_captured",
  "scan_completed",
  "scan_failed",
] as const;

export const reportOutputFormatValues = ["json", "markdown"] as const;
