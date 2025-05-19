const express = require("express");
const router = express.Router();
const Intelligence = require("../models/intelligence");
const { checkRole } = require("../middleware/auth");

// Get all intelligence items with pagination and filtering
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object from query parameters
    const filter = {};

    if (req.query.source) filter.source = req.query.source;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.minConfidence)
      filter.confidenceScore = { $gte: parseFloat(req.query.minConfidence) };
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Execute query with pagination
    const intelligenceItems = await Intelligence.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("collectedBy", "name email");

    // Get total count for pagination
    const total = await Intelligence.countDocuments(filter);

    res.json({
      data: intelligenceItems,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get intelligence error:", error);
    res.status(500).json({ error: "Failed to retrieve intelligence data" });
  }
});

// Get a specific intelligence item by ID
router.get("/:id", async (req, res) => {
  try {
    const intelligenceItem = await Intelligence.findById(req.params.id)
      .populate("collectedBy", "name email")
      .populate("relationships.relatedIntelligence");

    if (!intelligenceItem) {
      return res.status(404).json({ error: "Intelligence item not found" });
    }

    res.json(intelligenceItem);
  } catch (error) {
    console.error("Get intelligence item error:", error);
    res.status(500).json({ error: "Failed to retrieve intelligence item" });
  }
});

// Create a new intelligence item
router.post("/", checkRole(["admin", "analyst"]), async (req, res) => {
  try {
    const {
      source,
      type,
      content,
      imageUrl,
      mediaUrls,
      metadata,
      confidenceScore,
      sentiment,
      entities,
      aiAnalysis,
    } = req.body;

    const intelligenceItem = new Intelligence({
      source,
      type,
      content,
      imageUrl,
      mediaUrls,
      metadata,
      confidenceScore,
      sentiment,
      entities,
      aiAnalysis,
      collectedBy: req.auth.id,
    });

    await intelligenceItem.save();

    res.status(201).json({
      message: "Intelligence item created successfully",
      data: intelligenceItem,
    });
  } catch (error) {
    console.error("Create intelligence error:", error);
    res.status(500).json({ error: "Failed to create intelligence item" });
  }
});

// Update an intelligence item
router.put("/:id", checkRole(["admin", "analyst"]), async (req, res) => {
  try {
    const updates = req.body;

    // Remove fields that shouldn't be directly updated
    delete updates._id;
    delete updates.createdAt;
    delete updates.collectedBy;

    const intelligenceItem = await Intelligence.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!intelligenceItem) {
      return res.status(404).json({ error: "Intelligence item not found" });
    }

    res.json({
      message: "Intelligence item updated successfully",
      data: intelligenceItem,
    });
  } catch (error) {
    console.error("Update intelligence error:", error);
    res.status(500).json({ error: "Failed to update intelligence item" });
  }
});

// Delete an intelligence item
router.delete("/:id", checkRole(["admin"]), async (req, res) => {
  try {
    const intelligenceItem = await Intelligence.findByIdAndDelete(
      req.params.id
    );

    if (!intelligenceItem) {
      return res.status(404).json({ error: "Intelligence item not found" });
    }

    res.json({ message: "Intelligence item deleted successfully" });
  } catch (error) {
    console.error("Delete intelligence error:", error);
    res.status(500).json({ error: "Failed to delete intelligence item" });
  }
});

// Add a relationship between intelligence items
router.post(
  "/:id/relationships",
  checkRole(["admin", "analyst"]),
  async (req, res) => {
    try {
      const { relatedIntelligence, relationType, strength, description } =
        req.body;

      // Verify that the related intelligence item exists
      const relatedExists = await Intelligence.findById(relatedIntelligence);
      if (!relatedExists) {
        return res
          .status(404)
          .json({ error: "Related intelligence item not found" });
      }

      const intelligenceItem = await Intelligence.findById(req.params.id);
      if (!intelligenceItem) {
        return res.status(404).json({ error: "Intelligence item not found" });
      }

      // Add the relationship
      intelligenceItem.relationships.push({
        relatedIntelligence,
        relationType,
        strength,
        description,
      });

      await intelligenceItem.save();

      res.json({
        message: "Relationship added successfully",
        data: intelligenceItem,
      });
    } catch (error) {
      console.error("Add relationship error:", error);
      res.status(500).json({ error: "Failed to add relationship" });
    }
  }
);

// Get related intelligence items
router.get("/:id/related", async (req, res) => {
  try {
    const intelligenceItem = await Intelligence.findById(req.params.id);
    if (!intelligenceItem) {
      return res.status(404).json({ error: "Intelligence item not found" });
    }

    // Get IDs of related intelligence items
    const relatedIds = intelligenceItem.relationships.map(
      (rel) => rel.relatedIntelligence
    );

    // Find all related items
    const relatedItems = await Intelligence.find({
      _id: { $in: relatedIds },
    }).select("source type content confidenceScore createdAt");

    res.json(relatedItems);
  } catch (error) {
    console.error("Get related intelligence error:", error);
    res.status(500).json({ error: "Failed to retrieve related intelligence" });
  }
});

module.exports = router;
