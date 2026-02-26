require('dotenv').config();

const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ message: "No token provided. Access denied."})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

const isAdmin = async (req, res, next)=>{
    if(req.user && req.user.role === "Admin")
        next()
    else
        return res.status(403).json({ message: "Require Admin Role!" });
}

module.exports = {verifyToken, isAdmin}