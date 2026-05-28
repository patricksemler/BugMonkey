"use client";

import { RotateCcw } from "lucide-react";

import { StatusState } from "@/components/status-state";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-3xl space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Static UI state</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal">Something did not render</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This is a recoverable dashboard UI error state. No scan, storage, or backend work is triggered.
          </p>
        </div>
        <StatusState
          action={
            <Button onClick={reset} variant="secondary">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Try rendering again
            </Button>
          }
          body="Use this state for future recoverable route failures."
          density="page"
          title="Render fallback"
          variant="error"
        />
      </div>
    </main>
  );
}
