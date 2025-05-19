"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { mockNetworkData } from "@/data/mock-network-data";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph2D),
  { ssr: false }
);

export function IntelligenceMap() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 600 });

  useEffect(() => {
    function updateDimensions() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: 600,
        });
      }
    }
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Card className="w-full overflow-hidden border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Intelligence Relationship Map</h3>
        <p className="text-sm text-muted-foreground">
          Visualizing connections between intelligence data points
        </p>
      </div>
      <div className="relative" style={{ height: "600px" }} ref={containerRef}>
        {typeof window !== "undefined" && dimensions.width > 0 && (
          <ForceGraph2D
            graphData={mockNetworkData}
            nodeAutoColorBy="group"
            nodeLabel="id"
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.25}
            linkColor={() => "rgba(255, 255, 255, 0.2)"}
            backgroundColor="transparent"
            width={dimensions.width}
            height={dimensions.height}
          />
        )}
      </div>
    </Card>
  );
}
