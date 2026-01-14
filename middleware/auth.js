const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ error: "No token provided. Access denied." });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "your_secret_key"
        );

        // Attach user info to request
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ error: "Token has expired. Please login again." });
        }
        if (error.name === "JsonWebTokenError") {
            return res
                .status(401)
                .json({ error: "Invalid token. Access denied." });
        }
        res.status(401).json({ error: "Authentication failed." });
    }
};

// Middleware to check if user is the owner of the resource
const verifyOwnership = (req, res, next) => {
    try {
        const userId = req.params.id;
        const tokenUserId = req.user.userId;

        if (userId !== tokenUserId) {
            return res
                .status(403)
                .json({
                    error: "You don't have permission to perform this action.",
                });
        }

        next();
    } catch (error) {
        res.status(403).json({ error: "Authorization failed." });
    }
};

// Middleware to check if user is host (optional - for host-only routes)
const verifyHost = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Authentication required." });
        }

        // You might want to fetch the user from database to check if they are a host
        // For now, we just pass the request to the controller
        // The controller will handle the host verification
        next();
    } catch (error) {
        res.status(403).json({ error: "Authorization failed." });
    }
};

module.exports = { verifyToken, verifyOwnership, verifyHost };
