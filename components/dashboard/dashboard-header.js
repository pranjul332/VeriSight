"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/dashboard/main-nav";

export function DashboardHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Icons.shield className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            OSINT Intelligence
          </span>
        </Link>

        {isAuthenticated && <MainNav className="mx-6" />}

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <UserNav />
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
