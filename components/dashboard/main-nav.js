"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
  },
  {
    title: "Analysis",
    href: "/analysis",
    icon: "analysis",
  },
  {
    title: "Sources",
    href: "/sources",
    icon: "sources",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "reports",
  },
];

export function MainNav({ className }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
