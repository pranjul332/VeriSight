const mockTimelineData = [
  {
    id: "timeline-001",
    timestamp: "2025-04-01T08:15:00.000Z",
    title: "Initial Intelligence Gathering",
    type: "Reconnaissance",
    description:
      "Began monitoring target organization's public digital footprint",
    content:
      "Started automated collection of public social media posts, news articles, and website changes related to the target organization. Initial baseline established for normal communication patterns.",
    entities: ["social media", "news", "website", "target organization"],
  },
  {
    id: "timeline-002",
    timestamp: "2025-04-01T14:35:00.000Z",
    title: "Unusual Social Media Activity Detected",
    type: "Alert",
    description: "Multiple employees mentioning system downtime",
    content:
      "Several employees from the target organization posted about experiencing technical difficulties and system access problems, despite no official announcement of maintenance or outages.",
    entities: ["employees", "system downtime", "technical difficulties"],
  },
  {
    id: "timeline-003",
    timestamp: "2025-04-02T09:20:00.000Z",
    title: "Executive Movement Identified",
    type: "Personnel Change",
    description: "CTO left company unexpectedly",
    content:
      "Target organization's Chief Technology Officer announced immediate departure after 7 years with the company. No successor named, which is unusual for planned transitions.",
    entities: ["CTO", "departure", "succession planning"],
  },
  {
    id: "timeline-004",
    timestamp: "2025-04-03T11:45:00.000Z",
    title: "Security Patch Released",
    type: "Technical Update",
    description: "Emergency security update pushed to production systems",
    content:
      "Target organization released an unscheduled security patch labeled as 'critical'. Analysis of the patch indicates it addresses a remote code execution vulnerability in their customer-facing portal.",
    entities: [
      "security patch",
      "vulnerability",
      "remote code execution",
      "customer portal",
    ],
  },
  {
    id: "timeline-005",
    timestamp: "2025-04-04T16:10:00.000Z",
    title: "Financial Filing Amendment",
    type: "Regulatory",
    description: "Company filed amended SEC disclosure",
    content:
      "Target organization submitted an amended financial disclosure that includes new language about 'potential material impacts from cybersecurity incidents' not present in the original filing.",
    entities: [
      "SEC filing",
      "disclosure",
      "cybersecurity incidents",
      "financial impact",
    ],
  },
];
