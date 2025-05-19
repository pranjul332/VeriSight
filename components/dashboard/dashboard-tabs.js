"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntelligenceTable } from "@/components/intelligence/intelligence-table";
import { IntelligenceMap } from "@/components/intelligence/intelligence-map";
import { IntelligenceTimeline } from "@/components/intelligence/intelligence-timeline";

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("data");

  return (
    <Tabs defaultValue="data" className="w-full" onValueChange={setActiveTab}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Intelligence Data</h2>
        <TabsList>
          <TabsTrigger value="data">Data Feed</TabsTrigger>
          <TabsTrigger value="map">Relationship Map</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="data" className="space-y-4">
        <IntelligenceTable />
      </TabsContent>

      <TabsContent value="map">
        <IntelligenceMap />
      </TabsContent>

      <TabsContent value="timeline">
        <IntelligenceTimeline />
      </TabsContent>
    </Tabs>
  );
}
