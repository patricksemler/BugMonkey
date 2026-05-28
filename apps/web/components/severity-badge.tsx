import { Badge } from "@/components/ui/badge";
import type { IssueSeverity } from "@/lib/demo-data";

const severityTone = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "neutral",
} as const;

export function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  return (
    <Badge tone={severityTone[severity]}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}
