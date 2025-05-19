const mongoose = require("mongoose");

const IntelligenceSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "social-media",
      "news-article",
      "forum-post",
      "document",
      "image",
      "video",
      "other",
    ],
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  mediaUrls: [
    {
      type: String,
    },
  ],
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  sentiment: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.5,
  },
  entities: [
    {
      type: String,
    },
  ],
  relationships: [
    {
      relatedIntelligence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Intelligence",
      },
      relationType: {
        type: String,
        enum: ["related", "confirms", "contradicts", "expands"],
        default: "related",
      },
      strength: {
        type: Number,
        min: 0,
        max: 1,
        default: 0.5,
      },
      description: String,
    },
  ],
  aiAnalysis: {
    summary: String,
    tags: [String],
    recommendations: [String],
    riskAssessment: {
      level: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
      },
      factors: [String],
    },
  },
  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
IntelligenceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient searches
IntelligenceSchema.index({ source: 1, type: 1 });
IntelligenceSchema.index({ entities: 1 });
IntelligenceSchema.index({ createdAt: -1 });
IntelligenceSchema.index({
  content: "text",
  entities: "text",
  "aiAnalysis.summary": "text",
  "aiAnalysis.tags": "text",
});

const Intelligence = mongoose.model("Intelligence", IntelligenceSchema);

module.exports = Intelligence;
