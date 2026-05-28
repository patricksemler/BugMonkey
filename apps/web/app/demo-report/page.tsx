import Link from "next/link";
import { ArrowLeft, Download, FileJson, FileText } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SeverityBadge } from "@/components/severity-badge";
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
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to overview
            </Link>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal">{reportSummary.appName}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Static report page using generic evidence examples.
            </p>
          </div>
          <Badge tone="info">{reportSummary.generatedAt}</Badge>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Launch score</p>
              <p className="mt-2 text-3xl font-semibold">{reportSummary.score}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Pages represented</p>
              <p className="mt-2 text-3xl font-semibold">{reportSummary.scannedPages}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Issues represented</p>
              <p className="mt-2 text-3xl font-semibold">{reportSummary.issueCount}</p>
            </CardContent>
          </Card>
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
                      <div className="font-medium">{issue.title}</div>
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
          <StatusPanel title="Empty state" body="Production report history has not been connected in this milestone." />
          <StatusPanel title="Loading state" body="Future scan and report fetches can use this compact placeholder style." loading />
          <StatusPanel title="Error state" body="Future recoverable failures should explain what did not load." error />
        </section>
      </div>
    </AppShell>
  );
}

function StatusPanel({
  title,
  body,
  loading,
  error,
}: {
  title: string;
  body: string;
  loading?: boolean;
  error?: boolean;
}) {
  return (
    <Card>
      <CardContent className="flex gap-3 p-5">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100">
          {loading ? (
            <Download className="h-4 w-4 animate-pulse text-slate-600" aria-hidden="true" />
          ) : (
            <FileText className={`h-4 w-4 ${error ? "text-red-600" : "text-slate-600"}`} aria-hidden="true" />
          )}
        </span>
        <div>
          <p className="font-medium">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}
