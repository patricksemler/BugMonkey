import Link from "next/link";
import { Plus } from "lucide-react";

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
import { demoProjects } from "@/lib/demo-data";

export default function ProjectsPage() {
  return (
    <AppShell
      actions={
        <Button disabled>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New project unavailable
        </Button>
      }
      description="Static project placeholders for the dashboard route structure."
      eyebrow="Workspace"
      title="Projects"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project list</CardTitle>
            <CardDescription>
              Mock project rows only. Project creation and persistence are not connected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Issues</TableHead>
                  <TableHead className="hidden lg:table-cell">Last activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="font-medium">{project.name}</div>
                      <div className="break-all font-mono text-xs text-muted-foreground">
                        {project.targetUrl}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge tone={project.status === "Static preview" ? "success" : "neutral"}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{project.issueCount}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {project.lastActivity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <StatusState
            body="A real empty state will appear here before a user creates their first project."
            title="Empty projects"
            variant="empty"
          />
          <StatusState
            action={
              <Link className="text-sm font-medium text-foreground hover:underline" href="/demo-report">
                View static demo report
              </Link>
            }
            body="Use the demo report to inspect the intended issue-review flow."
            title="Static preview path"
            variant="loading"
          />
        </div>
      </div>
    </AppShell>
  );
}
