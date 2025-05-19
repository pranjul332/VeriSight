"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

export default function AnalysisPage() {
  const [selectedTab, setSelectedTab] = useState("text");

  return (
    
    <DashboardShell>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Intelligence Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze intelligence data using advanced AI capabilities
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Analysis Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="text">Text Analysis</TabsTrigger>
                <TabsTrigger value="image">Image Analysis</TabsTrigger>
                <TabsTrigger value="network">Network Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter text for analysis..."
                      className="flex-1"
                    />
                    <Button>
                      <Icons.zap className="mr-2 h-4 w-4" />
                      Analyze
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Entity Recognition</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          No entities detected yet
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Sentiment Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          No sentiment data available
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-8">
                    <div className="text-center">
                      <Icons.image className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-sm font-semibold">
                        Upload an image
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to select
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="network" className="mt-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Network Graph Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Upload network data or select from existing intelligence
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
