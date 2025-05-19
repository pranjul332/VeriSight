const mockIntelligenceData = [
  {
    id: "intel-001",
    timestamp: "2025-04-01T18:25:43.511Z",
    source: "Twitter",
    type: "social-media",
    content:
      "Just spotted unusual network activity from our competitor's servers. #cybersecurity #breach",
    confidenceScore: 0.85,
    entities: ["network activity", "competitor", "cybersecurity", "breach"],
    sentiment: 0.35,
    aiSummary:
      "This tweet indicates potential security concerns regarding a competitor's network infrastructure. The author appears to be monitoring or observing unusual patterns that may suggest unauthorized access or other security issues.",
    imageUrl:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
    relationships: [
      {
        id: "intel-003",
        type: "Related evidence",
        timestamp: "2025-04-01T19:15:22.511Z",
        description: "Network traffic logs showing unusual patterns",
      },
      {
        id: "intel-007",
        type: "Entity connection",
        timestamp: "2025-04-02T09:35:12.511Z",
        description: "Previously identified vulnerability in the same network",
      },
    ],
  },
  {
    id: "intel-002",
    timestamp: "2025-04-01T19:12:18.511Z",
    source: "TechCrunch",
    type: "news-article",
    content:
      "Industry leader announces revolutionary new encryption technology that could reshape how companies protect sensitive information. The announcement comes amid rising concerns about data breaches and cyber attacks targeting major corporations.",
    confidenceScore: 0.92,
    entities: [
      "encryption technology",
      "data breaches",
      "cyber attacks",
      "corporations",
    ],
    sentiment: 0.78,
    aiSummary:
      "This news article covers a significant advancement in encryption technology by an industry leader. The development is positioned as a potential game-changer for corporate data security, especially in the context of increasing cyber threats.",
    imageUrl:
      "https://images.pexels.com/photos/2882630/pexels-photo-2882630.jpeg",
    relationships: [],
  },
  {
    id: "intel-003",
    timestamp: "2025-04-02T08:45:37.511Z",
    source: "Reddit",
    type: "forum-post",
    content:
      "Has anyone else noticed that Company X's website has been having unusual downtime in the past 24 hours? Their status page shows everything is normal but I can't access several key features.",
    confidenceScore: 0.65,
    entities: ["Company X", "website", "downtime", "status page"],
    sentiment: 0.42,
    aiSummary:
      "A user reports inconsistencies between Company X's official status reporting and actual website functionality. Multiple features appear to be inaccessible despite the company claiming normal operations, which could indicate either technical issues being concealed or a potential security incident.",
    imageUrl: null,
    relationships: [],
  },
  {
    id: "intel-004",
    timestamp: "2025-04-02T10:22:51.511Z",
    source: "LinkedIn",
    type: "social-media",
    content:
      "Excited to announce I've joined the cybersecurity team at Company Y after 8 years at Company X. Looking forward to new challenges!",
    confidenceScore: 0.88,
    entities: ["cybersecurity team", "Company Y", "Company X"],
    sentiment: 0.91,
    aiSummary:
      "A professional has moved from Company X to a competitor (Company Y) after a significant tenure. This personnel change in the cybersecurity department could potentially lead to knowledge transfer between competing organizations.",
    imageUrl: null,
    relationships: [],
  },
  {
    id: "intel-005",
    timestamp: "2025-04-02T14:17:39.511Z",
    source: "GitHub",
    type: "document",
    content:
      "Pull request merged: Fix critical vulnerability in authentication module affecting all versions prior to 2.5.0. Update recommended immediately.",
    confidenceScore: 0.95,
    entities: ["vulnerability", "authentication module", "version 2.5.0"],
    sentiment: 0.65,
    aiSummary:
      "A significant security vulnerability in an authentication system has been patched. The language suggests the issue was severe and affected multiple versions of the software. Organizations using this software should update immediately to mitigate risk.",
    imageUrl: null,
    relationships: [],
  },
  {
    id: "intel-006",
    timestamp: "2025-04-03T09:08:22.511Z",
    source: "Company Z Blog",
    type: "news-article",
    content:
      "Announcing our acquisition of SmallTech Inc, adding their advanced AI capabilities to our security portfolio. This strategic move will enhance our threat detection systems with cutting-edge machine learning algorithms.",
    confidenceScore: 0.89,
    entities: [
      "Company Z",
      "SmallTech Inc",
      "AI capabilities",
      "threat detection",
      "machine learning",
    ],
    sentiment: 0.85,
    aiSummary:
      "Company Z has acquired SmallTech Inc to incorporate their AI technology into security products. This acquisition indicates Company Z is investing in advanced threat detection capabilities, potentially changing competitive dynamics in the security market.",
    imageUrl:
      "https://images.pexels.com/photos/4492126/pexels-photo-4492126.jpeg",
    relationships: [],
  },
  {
    id: "intel-007",
    timestamp: "2025-04-03T11:35:48.511Z",
    source: "Security Conference",
    type: "image",
    content:
      "Slide from presentation showing unreleased product roadmap for Company X's security suite, including timeline for major new features.",
    confidenceScore: 0.72,
    entities: [
      "product roadmap",
      "Company X",
      "security suite",
      "features timeline",
    ],
    sentiment: 0.6,
    aiSummary:
      "This conference presentation slide reveals non-public information about Company X's product development plans. The roadmap contains specific timing for new security features that could be competitively valuable intelligence.",
    imageUrl:
      "https://images.pexels.com/photos/8636612/pexels-photo-8636612.jpeg",
    relationships: [],
  },
];
