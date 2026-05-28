import Link from "next/link";
import { Play } from "lucide-react";

import { AppShell } from "@/components/app-shell";
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
import { demoScans } from "@/lib/demo-data";

export default function ScansPage() {
  return (
    <AppShell
      actions={
        <Button disabled>
          <Play className="h-4 w-4" aria-hidden="true" />
          New scan unavailable
        </Button>
      }
      description="Static scan history placeholders. The Playwright worker is not implemented yet."
      eyebrow="Scan history"
      title="Scans"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Scan slots</CardTitle>
            <CardDescription>
              Mock rows for future scan history without scanner behavior.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Pages</TableHead>
                  <TableHead className="hidden md:table-cell">Issues</TableHead>
                  <TableHead className="hidden lg:table-cell">Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoScans.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell>
                      <div className="font-medium">{scan.name}</div>
                      <div className="break-all font-mono text-xs text-muted-foreground">
                        {scan.targetUrl}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge tone={scan.status === "Static preview" ? "success" : "neutral"}>
                        {scan.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{scan.pages}</TableCell>
                    <TableCell className="hidden md:table-cell">{scan.issues}</TableCell>
                    <TableCell className="hidden font-mono text-xs text-muted-foreground lg:table-cell">
                      {scan.mode}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          <StatusState body="No production scan jobs exist in this static milestone." density="page" title="Empty scan history" variant="empty" />
          <StatusState body="Future worker progress can use this loading treatment." density="page" title="Loading scan status" variant="loading" />
          <StatusState
            action={
              <Link className="text-sm font-medium text-foreground hover:underline" href="/demo-report/issues/BM-DEMO-001">
                Inspect demo issue
              </Link>
            }
            body="Future scan failures should stay evidence-bound and recoverable."
            density="page"
            title="Error placeholder"
            variant="error"
          />
        </section>
      </div>
    </AppShell>
  );
}
