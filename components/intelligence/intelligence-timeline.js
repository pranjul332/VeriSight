"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTimelineData } from "@/data/mock-timeline-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function IntelligenceTimeline() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Intelligence Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-muted before:ml-7">
          {mockTimelineData.map((event, index) => (
            <div key={index} className="relative pl-12">
              <div className="flex items-center mb-2">
                <div className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground border-4 border-background">
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{event.type}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.description}
                  </p>
                </div>
              </div>

              {event.content && (
                <div className="mt-2 p-3 border rounded-md bg-background">
                  <p className="text-sm">{event.content}</p>
                </div>
              )}

              {event.entities && event.entities.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">
                    Entities
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {event.entities.map((entity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm">
                  Details
                </Button>
                <Button variant="outline" size="sm">
                  Evidence
                </Button>
              </div>

              {index < mockTimelineData.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
