import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Clock3,
  Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SeverityBadge } from "@/components/severity-badge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoIssues, recentRuns, reportSummary } from "@/lib/demo-data";

const scoreSegments = [
  { label: "Critical", value: 1, className: "bg-red-500" },
  { label: "High", value: 1, className: "bg-amber-500" },
  { label: "Medium", value: 2, className: "bg-sky-500" },
  { label: "Low", value: 2, className: "bg-slate-400" },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Readiness score" value={`${reportSummary.score}%`} detail="Static demo report" />
          <MetricCard label="Pages represented" value={reportSummary.scannedPages.toString()} detail="Generic sample data" />
          <MetricCard label="Open issues" value={reportSummary.issueCount.toString()} detail="No live scanner attached" />
          <MetricCard label="Report mode" value="Rule-based" detail="Default production direction" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>Dashboard preview</CardTitle>
                <CardDescription>
                  A static workspace shell for reviewing launch-readiness signals.
                </CardDescription>
              </div>
              <Link
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-slate-800 sm:w-auto"
                href="/demo-report"
              >
                Open demo report
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-slate-50 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Target URL</p>
                    <p className="mt-1 break-all text-base font-semibold">{reportSummary.targetUrl}</p>
                  </div>
                  <Badge tone="info">Static preview only</Badge>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  {scoreSegments.map((segment) => (
                    <div className="rounded-md border bg-white p-3" key={segment.label}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-muted-foreground">{segment.label}</span>
                        <span className="text-sm font-semibold">{segment.value}</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-slate-100">
                        <div className={`h-2 rounded-full ${segment.className}`} style={{ width: `${segment.value * 35}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current states</CardTitle>
              <CardDescription>UI treatments for not-yet-connected workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <StateRow icon={Clock3} label="Empty" text="No production scans are connected yet." />
              <StateRow icon={Loader2} label="Loading" text="Reserved for future scan fetch states." muted />
              <StateRow icon={AlertTriangle} label="Error" text="Reserved for recoverable UI failures." warning />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1.15fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recent scan slots</CardTitle>
              <CardDescription>Static rows showing the intended dashboard density.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRuns.map((run) => (
                  <div className="flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between" key={run.name}>
                    <div>
                      <p className="font-medium">{run.name}</p>
                      <p className="text-sm text-muted-foreground">{run.pages}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={run.status === "Not connected" ? "neutral" : "success"}>
                        {run.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{run.issues}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issue preview</CardTitle>
              <CardDescription>Representative issue rows without live scanner claims.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="hidden md:table-cell">URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoIssues.slice(0, 4).map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-xs text-muted-foreground">{issue.type}</div>
                      </TableCell>
                      <TableCell>
                        <SeverityBadge severity={issue.severity} />
                      </TableCell>
                      <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell">
                        {issue.url}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function StateRow({
  icon: Icon,
  label,
  text,
  muted,
  warning,
}: {
  icon: LucideIcon;
  label: string;
  text: string;
  muted?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="flex gap-3 rounded-md border p-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100">
        <Icon className={`h-4 w-4 ${warning ? "text-amber-600" : "text-slate-600"} ${muted ? "animate-spin" : ""}`} aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
