import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { SeverityBadge } from "@/components/severity-badge";
import { StatusState } from "@/components/status-state";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoIssues, demoProjects, demoScans, reportSummary } from "@/lib/demo-data";

const scoreSegments = [
  { label: "Critical", value: 1, className: "bg-red-500" },
  { label: "High", value: 1, className: "bg-amber-500" },
  { label: "Medium", value: 2, className: "bg-sky-500" },
  { label: "Low", value: 2, className: "bg-slate-400" },
];

export default function HomePage() {
  return (
    <AppShell
      description="Static route polish for the dashboard shell. No production scans are connected yet."
      title="Launch readiness workspace"
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Readiness score" value={`${reportSummary.score}%`} detail="Static demo report" />
          <MetricCard label="Projects represented" value={demoProjects.length.toString()} detail="Mock project rows" />
          <MetricCard label="Scan slots" value={demoScans.length.toString()} detail="Static route shells" />
          <MetricCard label="Report mode" value="Rule-based" detail="Default production direction" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>Dashboard preview</CardTitle>
                <CardDescription>
                  Static workspace routes for reviewing launch-readiness signals.
                </CardDescription>
              </div>
              <Link className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-slate-800 sm:w-auto" href="/demo-report">
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
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
              <CardDescription>Shared UI treatments for not-yet-connected workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatusState body="No production scans are connected yet." title="Empty project state" variant="empty" />
              <StatusState body="Reserved for future scan fetch states." title="Loading placeholder" variant="loading" />
              <StatusState body="Reserved for recoverable UI failures." title="Error placeholder" variant="error" />
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
                {demoScans.map((scan) => (
                  <div className="flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between" key={scan.id}>
                    <div>
                      <p className="font-medium">{scan.name}</p>
                      <p className="break-all text-sm text-muted-foreground">{scan.targetUrl}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={scan.status === "Static preview" ? "success" : "neutral"}>
                        {scan.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{scan.issues} issues</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issue preview</CardTitle>
              <CardDescription>Representative issue rows without scanner claims.</CardDescription>
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
                        <Link className="font-medium hover:underline" href={`/demo-report/issues/${issue.id}`}>
                          {issue.title}
                        </Link>
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
