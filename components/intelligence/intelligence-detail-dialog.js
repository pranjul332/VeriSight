"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function IntelligenceDetailDialog({ item, open, onClose }) {
  if (!item) return null;

  const date = new Date(item.timestamp);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Intelligence Record
            <Badge>{item.type}</Badge>
          </DialogTitle>
          <DialogDescription>
            Captured on {date.toLocaleDateString()} at{" "}
            {date.toLocaleTimeString()}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 my-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Source
                </h3>
                <p>{item.source}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Type
                </h3>
                <p>{item.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Confidence Score
                </h3>
                <p>{(parseFloat(item.confidenceScore) * 100).toFixed(0)}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Timestamp
                </h3>
                <p>{date.toLocaleString()}</p>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">Content</h3>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </CardContent>
            </Card>

            {item.imageUrl && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">Media</h3>
                  <div className="relative aspect-video overflow-hidden rounded-md">
                    <img
                      src={item.imageUrl}
                      alt="Intelligence media"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Icons.download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Icons.zap className="mr-2 h-4 w-4" />
                Run Analysis
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    AI Analysis Results
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Entities Detected
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.entities &&
                          item.entities.map((entity, i) => (
                            <Badge key={i} variant="outline">
                              {entity}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Sentiment Analysis
                      </h4>
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              item.sentiment > 0.6
                                ? "bg-green-500"
                                : item.sentiment < 0.4
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                            style={{ width: `${item.sentiment * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm">
                          {(item.sentiment * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.sentiment > 0.6
                          ? "Positive"
                          : item.sentiment < 0.4
                          ? "Negative"
                          : "Neutral"}{" "}
                        sentiment detected
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        AI Summary
                      </h4>
                      <p className="text-sm mt-2">
                        {item.aiSummary ||
                          "No AI summary available for this intelligence record."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationships">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-4">
                  Related Intelligence
                </h3>
                {item.relationships && item.relationships.length > 0 ? (
                  <div className="space-y-4">
                    {item.relationships.map((rel, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-3 rounded-md border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{rel.type}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(rel.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{rel.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icons.network className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No relationships found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This intelligence item is not connected to any other
                      records yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
