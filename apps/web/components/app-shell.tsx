import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

import { AppNav } from "@/components/app-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AppShell({
  actions,
  children,
  description,
  eyebrow = "Pre-launch QA dashboard",
  title = "Launch readiness workspace",
}: {
  actions?: ReactNode;
  children: ReactNode;
  description?: string;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-border bg-white/80 px-4 py-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-5">
          <div className="flex items-center justify-between gap-4 lg:block">
            <Link className="flex items-center gap-2" href="/">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold">BugMonkey</span>
                <span className="block text-xs text-muted-foreground">Static UI shell</span>
              </span>
            </Link>
            <Badge className="lg:mt-5" tone="info">
              002b
            </Badge>
          </div>
          <AppNav />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border bg-white/70 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
                <h1 className="text-xl font-semibold tracking-normal">{title}</h1>
                {description ? (
                  <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {actions ?? <Button disabled>Run scan unavailable</Button>}
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
