export type IssueSeverity = "critical" | "high" | "medium" | "low";

export type DemoIssue = {
  id: string;
  title: string;
  severity: IssueSeverity;
  type: string;
  url: string;
  evidence: string;
  status: "Open" | "Needs review" | "Ready to export";
};

export type DemoProject = {
  id: string;
  name: string;
  targetUrl: string;
  status: "Static preview" | "Not connected";
  lastActivity: string;
  issueCount: number;
};

export type DemoScan = {
  id: string;
  name: string;
  targetUrl: string;
  status: "Static preview" | "Queued placeholder" | "Unavailable";
  pages: number;
  issues: number;
  mode: "rule_based";
};

export const reportSummary = {
  appName: "Launch Readiness Demo",
  targetUrl: "https://demo.example.com",
  score: 82,
  scannedPages: 7,
  issueCount: 6,
  generatedAt: "Static demo data",
};

export const demoIssues: DemoIssue[] = [
  {
    id: "BM-DEMO-001",
    title: "Checkout page returns a server error",
    severity: "critical",
    type: "HTTP_ERROR_STATUS",
    url: "/checkout",
    evidence: "Captured response status 500 during page load.",
    status: "Open",
  },
  {
    id: "BM-DEMO-002",
    title: "Primary navigation link is broken",
    severity: "high",
    type: "BROKEN_LINK",
    url: "/pricing",
    evidence: "Link target returned 404 from the pricing navigation item.",
    status: "Needs review",
  },
  {
    id: "BM-DEMO-003",
    title: "Mobile viewport has horizontal overflow",
    severity: "medium",
    type: "MOBILE_HORIZONTAL_OVERFLOW",
    url: "/dashboard",
    evidence: "Mobile screenshot exceeded viewport width by 84px.",
    status: "Open",
  },
  {
    id: "BM-DEMO-004",
    title: "Hero image is missing alt text",
    severity: "medium",
    type: "IMAGE_MISSING_ALT",
    url: "/",
    evidence: "One visible image had an empty accessible name.",
    status: "Ready to export",
  },
  {
    id: "BM-DEMO-005",
    title: "Console error appears on account settings",
    severity: "low",
    type: "CONSOLE_ERROR",
    url: "/settings",
    evidence: "One non-blocking client-side console error was recorded.",
    status: "Needs review",
  },
  {
    id: "BM-DEMO-006",
    title: "Metadata description is missing",
    severity: "low",
    type: "MISSING_META_DESCRIPTION",
    url: "/blog",
    evidence: "The page loaded without a meta description tag.",
    status: "Ready to export",
  },
];

export function getDemoIssue(issueId: string) {
  return demoIssues.find((issue) => issue.id === issueId);
}

export const recentRuns = [
  {
    name: "Demo checkout flow",
    status: "Static preview",
    pages: "7 pages",
    issues: "6 issues",
  },
  {
    name: "Marketing pages",
    status: "Not connected",
    pages: "No scan yet",
    issues: "UI only",
  },
  {
    name: "Mobile layout pass",
    status: "Static preview",
    pages: "3 pages",
    issues: "2 issues",
  },
];

export const demoProjects: DemoProject[] = [
  {
    id: "project-demo-store",
    name: "Demo storefront",
    targetUrl: "https://demo.example.com",
    status: "Static preview",
    lastActivity: "Demo report available",
    issueCount: 6,
  },
  {
    id: "project-marketing",
    name: "Marketing site",
    targetUrl: "https://marketing.example.com",
    status: "Not connected",
    lastActivity: "No production scan yet",
    issueCount: 0,
  },
  {
    id: "project-dashboard",
    name: "Admin dashboard",
    targetUrl: "https://dashboard.example.com",
    status: "Static preview",
    lastActivity: "Mobile layout sample",
    issueCount: 2,
  },
];

export const demoScans: DemoScan[] = [
  {
    id: "scan-demo-checkout",
    name: "Demo checkout flow",
    targetUrl: "https://demo.example.com",
    status: "Static preview",
    pages: 7,
    issues: 6,
    mode: "rule_based",
  },
  {
    id: "scan-marketing",
    name: "Marketing pages",
    targetUrl: "https://marketing.example.com",
    status: "Unavailable",
    pages: 0,
    issues: 0,
    mode: "rule_based",
  },
  {
    id: "scan-mobile-layout",
    name: "Mobile layout pass",
    targetUrl: "https://dashboard.example.com",
    status: "Queued placeholder",
    pages: 3,
    issues: 2,
    mode: "rule_based",
  },
];

export const settingsSections = [
  {
    title: "Report mode",
    value: "Rule-based default",
    description: "LLM-enhanced reporting remains unconfigured and outside this milestone.",
  },
  {
    title: "Hosted scan safety",
    value: "Private networks blocked",
    description: "Scanner enforcement will be implemented in the worker milestone.",
  },
  {
    title: "Evidence storage",
    value: "Not connected",
    description: "Storage provider selection is deferred to a later milestone.",
  },
];
