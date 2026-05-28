import Link from "next/link";
import { FileJson, FileText } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SeverityBadge } from "@/components/severity-badge";
import { StatusState } from "@/components/status-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoIssues, reportSummary } from "@/lib/demo-data";

export default function DemoReportPage() {
  return (
    <AppShell
      actions={<Badge tone="info">{reportSummary.generatedAt}</Badge>}
      description="Generic evidence examples for route and layout polish."
      eyebrow="Static report"
      title={reportSummary.appName}
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Launch score" value={`${reportSummary.score}%`} />
          <MetricCard label="Pages represented" value={reportSummary.scannedPages.toString()} />
          <MetricCard label="Issues represented" value={reportSummary.issueCount.toString()} />
        </section>

        <Card>
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle>Issue evidence</CardTitle>
              <CardDescription>
                Deterministic-looking report rows for the UI shell only.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button disabled variant="secondary">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Export Markdown
              </Button>
              <Button disabled variant="secondary">
                <FileJson className="h-4 w-4" aria-hidden="true" />
                Export JSON
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="hidden lg:table-cell">Evidence</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{issue.id}</TableCell>
                    <TableCell>
                      <Link className="font-medium hover:underline" href={`/demo-report/issues/${issue.id}`}>
                        {issue.title}
                      </Link>
                      <div className="mt-1 font-mono text-xs text-muted-foreground">{issue.url}</div>
                    </TableCell>
                    <TableCell>
                      <SeverityBadge severity={issue.severity} />
                    </TableCell>
                    <TableCell className="hidden max-w-sm text-sm text-muted-foreground lg:table-cell">
                      {issue.evidence}
                    </TableCell>
                    <TableCell>
                      <Badge tone={issue.status === "Open" ? "warning" : "neutral"}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          <StatusState body="Production report history has not been connected in this milestone." title="Empty state" variant="empty" />
          <StatusState body="Future scan and report fetches can use this compact placeholder style." title="Loading state" variant="loading" />
          <StatusState body="Future recoverable failures should explain what did not load." title="Error state" variant="error" />
        </section>
      </div>
    </AppShell>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
