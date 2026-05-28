import { AlertTriangle, Clock3, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type StatusStateVariant = "empty" | "loading" | "error";

const stateConfig = {
  empty: {
    icon: Clock3,
    iconClassName: "text-slate-600",
    label: "Empty",
  },
  loading: {
    icon: Loader2,
    iconClassName: "animate-spin text-slate-600",
    label: "Loading",
  },
  error: {
    icon: AlertTriangle,
    iconClassName: "text-amber-600",
    label: "Error",
  },
} as const;

export function StatusState({
  action,
  body,
  className,
  title,
  variant,
}: {
  action?: ReactNode;
  body: string;
  className?: string;
  title?: string;
  variant: StatusStateVariant;
}) {
  const config = stateConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn("flex gap-3 rounded-md border bg-white p-3", className)}>
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100">
        <Icon className={cn("h-4 w-4", config.iconClassName)} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title ?? config.label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
    </div>
  );
}
