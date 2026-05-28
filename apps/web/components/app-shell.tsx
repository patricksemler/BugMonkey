import Link from "next/link";
import type { ReactNode } from "react";
import { Activity, BarChart3, FileText, Settings, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/demo-report", label: "Demo report", icon: FileText },
  { href: "#", label: "Scans", icon: Activity },
  { href: "#", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
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
              002a
            </Badge>
          </div>
          <nav className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-1">
            {navItems.map((item) => (
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                href={item.href}
                key={item.label}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border bg-white/70 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pre-launch QA dashboard</p>
                <h1 className="text-xl font-semibold tracking-normal">Launch readiness workspace</h1>
              </div>
              <Button disabled>Run scan unavailable</Button>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
