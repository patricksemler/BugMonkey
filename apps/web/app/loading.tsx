import { AppShell } from "@/components/app-shell";
import { StatusState } from "@/components/status-state";

export default function Loading() {
  return (
    <AppShell
      description="Preparing a static dashboard route."
      eyebrow="Static UI state"
      title="Loading"
    >
      <StatusState
        body="This placeholder keeps route transitions visually consistent while future data loading is added."
        density="page"
        title="Loading dashboard shell"
        variant="loading"
      />
    </AppShell>
  );
}
