const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ 
            success: false, 
            message: "No token provided" 
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ 
            success: false, 
            message: "Invalid token format" 
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "No token provided" 
        });
    }

    try {
        console.log("VERIFY TOKEN");
        console.log("Header :", authHeader);
        console.log("Token :", token);
        console.log("Secret :", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded :", decoded);
        req.user = decoded;
        return next();
    } catch (error) {
        console.log("JWT ERROR");
        console.log(error);
        return res.status(401).json({ 
            success: false, 
            message: "Invalid token" 
        });
    }
}

module.exports = verifyToken;