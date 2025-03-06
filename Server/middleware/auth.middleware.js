const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "User access required" });
  }
  next();
};

const authorizeUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "User No have  access " });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin, authorizeUser };
