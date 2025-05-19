// Express.js server for OSINT Intelligence Platform

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { expressjwt: jwt } = require("express-jwt");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Auth middleware - only applied to protected routes
const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET || "development_secret_key",
  algorithms: ["HS256"],
}).unless({ path: ["/api/auth/login", "/api/auth/register", "/api/health"] });

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

// API Routes
const authRoutes = require("./routes/auth");
const intelligenceRoutes = require("./routes/intelligence");
const analysisRoutes = require("./routes/analysis");
const extensionRoutes = require("./routes/extension");

app.use("/api/auth", authRoutes);
app.use("/api/intelligence", jwtMiddleware, intelligenceRoutes);
app.use("/api/analysis", jwtMiddleware, analysisRoutes);
app.use("/api/extension", jwtMiddleware, extensionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Use environment variable for MongoDB connection string in production
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/osint_platform";

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// Start the server when file is directly executed
if (require.main === module) {
  startServer();
}

module.exports = app; // Export for testing
