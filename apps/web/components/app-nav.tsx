"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, FileText, FolderKanban, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/scans", label: "Scans", icon: Activity },
  { href: "/demo-report", label: "Demo report", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 grid grid-cols-2 gap-1.5 lg:grid-cols-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-slate-100 text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-slate-100 hover:text-foreground",
            )}
            href={item.href}
            key={item.label}
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
