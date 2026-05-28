import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { StatusState } from "@/components/status-state";

export default function NotFound() {
  return (
    <AppShell
      description="The requested static dashboard route does not exist."
      eyebrow="Static UI state"
      title="Page not found"
    >
      <StatusState
        action={
          <Link className="inline-flex text-sm font-medium text-foreground hover:underline" href="/">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Return to overview
          </Link>
        }
        body="This fallback keeps unknown routes inside the dashboard shell without starting any backend workflow."
        density="page"
        title="Unknown route"
        variant="empty"
      />
    </AppShell>
  );
}
