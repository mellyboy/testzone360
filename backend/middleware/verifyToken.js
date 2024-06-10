const jwt = require('jsonwebtoken');

//middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, 'my-32-character-ultra-secure-and-ultra-long-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = decoded;
        next();
    });
};