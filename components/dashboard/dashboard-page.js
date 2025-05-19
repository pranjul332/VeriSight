"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardCards } from "@/components/dashboard/dashboard-card";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { Icons } from "@/components/icons";

export function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // While redirecting, render nothing or a placeholder
    return null;
  }

  return (
    <DashboardShell>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and analyze OSINT data from multiple sources in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          <DashboardCards />
        </div>

        <div className="mb-6">
          <DashboardTabs />
        </div>
      </div>
    </DashboardShell>
  );
}
