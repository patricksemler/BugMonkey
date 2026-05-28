import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  detail,
  label,
  value,
  valueClassName,
}: {
  detail?: ReactNode;
  label: string;
  value: ReactNode;
  valueClassName?: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={cn("mt-2 text-2xl font-semibold tracking-normal", valueClassName)}>
          {value}
        </p>
        {detail ? <div className="mt-1 text-sm text-muted-foreground">{detail}</div> : null}
      </CardContent>
    </Card>
  );
}
