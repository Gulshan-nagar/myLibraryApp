import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Not authorized, user not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export default authMiddleware;
