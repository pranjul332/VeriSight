// Middleware for role-based access control
exports.checkRole = (roles) => {
  return (req, res, next) => {
    // req.auth is set by express-jwt middleware
    if (!req.auth) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({
        error: "Insufficient permissions",
        message: `This action requires ${roles.join(" or ")} role`,
      });
    }

    next();
  };
};

// Middleware to check if user is accessing their own resource
exports.checkSelf = (userIdParam) => {
  return (req, res, next) => {
    const paramUserId = req.params[userIdParam];

    if (req.auth.id !== paramUserId && req.auth.role !== "admin") {
      return res.status(403).json({
        error: "Insufficient permissions",
        message: "You can only access your own resources",
      });
    }

    next();
  };
};
