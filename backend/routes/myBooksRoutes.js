import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyBooks, addMyBook, updateStatus, updateRating, updateMyBook } from "../controllers/myBooksController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getMyBooks);
router.post("/:bookId", addMyBook);
router.patch("/:bookId/status", updateStatus);
router.patch("/:bookId/rating", updateRating);
router.patch("/:bookId", updateMyBook); // general update

export default router;
