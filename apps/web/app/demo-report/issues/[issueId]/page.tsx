import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
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
import { demoIssues, getDemoIssue } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoIssues.map((issue) => ({
    issueId: issue.id,
  }));
}

export default async function DemoIssuePage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const { issueId } = await params;
  const issue = getDemoIssue(issueId);

  if (!issue) {
    return (
      <AppShell
        description="Unknown demo issue IDs render a safe static fallback."
        eyebrow="Static issue detail"
        title="Issue not found"
      >
        <div className="space-y-6">
          <Link className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" href="/demo-report">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to demo report
          </Link>
          <StatusState
            action={
              <Link className="text-sm font-medium text-foreground hover:underline" href="/demo-report">
                Return to static report
              </Link>
            }
            body={`No static demo issue exists for "${issueId}".`}
            density="page"
            title="Unknown issue"
            variant="error"
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      actions={
        <Button disabled variant="secondary">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Export unavailable
        </Button>
      }
      description="Static evidence detail for the demo report."
      eyebrow="Static issue detail"
      title={issue.title}
    >
      <div className="space-y-6">
        <Link className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" href="/demo-report">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to demo report
        </Link>

        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Issue ID" value={issue.id} valueClassName="break-all font-mono text-lg" />
          <MetricCard label="Severity" value={<SeverityBadge severity={issue.severity} />} />
          <MetricCard label="Status" value={<Badge tone={issue.status === "Open" ? "warning" : "neutral"}>{issue.status}</Badge>} />
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Evidence</CardTitle>
            <CardDescription>
              Generic static evidence text only. Raw evidence storage is not connected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Affected URL</p>
              <p className="mt-1 font-mono text-sm">{issue.url}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Captured signal</p>
              <p className="mt-1 text-sm">{issue.evidence}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reproduction outline</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Open the affected URL in the static demo context.</li>
                <li>Review the captured signal listed above.</li>
                <li>Use the future scanner report to attach real evidence.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
