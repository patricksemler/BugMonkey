import { Save } from "lucide-react";

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
import { settingsSections } from "@/lib/demo-data";

export default function SettingsPage() {
  return (
    <AppShell
      actions={
        <Button disabled>
          <Save className="h-4 w-4" aria-hidden="true" />
          Save unavailable
        </Button>
      }
      description="Static configuration placeholders. No settings are persisted in this milestone."
      eyebrow="Workspace settings"
      title="Settings"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration preview</CardTitle>
            <CardDescription>
              These rows document future settings surfaces without storing user data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {settingsSections.map((section) => (
              <div className="rounded-md border p-4" key={section.title}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium">{section.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                  </div>
                  <Badge tone="neutral">{section.value}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          <StatusState body="Account, team, and billing settings are outside this milestone." density="page" title="Empty settings" variant="empty" />
          <StatusState body="Future settings fetches can use this loading state." density="page" title="Loading settings" variant="loading" />
          <StatusState body="Future save failures should explain what did not persist." density="page" title="Error state" variant="error" />
        </section>
      </div>
    </AppShell>
  );
}
