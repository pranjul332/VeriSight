"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

export function DashboardCards() {
  const stats = [
    {
      title: "Active Scans",
      value: "24",
      description: "Ongoing intelligence gathering",
      icon: <Icons.activity className="h-5 w-5 text-blue-500" />,
      change: "+12% from last week",
      changeType: "positive",
    },
    {
      title: "Data Sources",
      value: "87",
      description: "Connected intelligence sources",
      icon: <Icons.database className="h-5 w-5 text-green-500" />,
      change: "+5 new sources this month",
      changeType: "positive",
    },
    {
      title: "Risk Alerts",
      value: "8",
      description: "High-priority security alerts",
      icon: <Icons.alertTriangle className="h-5 w-5 text-orange-500" />,
      change: "-3 from yesterday",
      changeType: "negative",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              {stat.icon}
              <CardTitle className="text-lg font-medium">
                {stat.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
          <CardFooter>
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stat.change}
            </p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
