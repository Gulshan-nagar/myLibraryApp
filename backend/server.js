import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import myBooksRoutes from "./routes/myBooksRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://mylibraryapp-1.onrender.com", // deployed frontend
  // Add more frontend URLs if needed
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => res.send("My Library API"));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/mybooks", myBooksRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
