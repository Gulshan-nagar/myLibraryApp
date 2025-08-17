import MyBook from "../models/myBookModel.js";
import Book from "../models/bookModel.js";

export const getMyBooks = async (req, res) => {
  try {
    const mybooks = await MyBook.find({ userId: req.user._id }).populate("bookId");
    res.json({ mybooks });
  } catch (err) {
    console.error("Get mybooks error:", err);
    res.status(500).json({ message: "Server error fetching your books" });
  }
};

export const addMyBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const exists = await MyBook.findOne({ userId: req.user._id, bookId: book._id });
    if (exists) return res.status(400).json({ message: "Book already in your list" });

    const mybook = await MyBook.create({
      userId: req.user._id,
      bookId: book._id,
      status: "Want to Read",
      totalPages: book.totalPages || undefined,
    });

    const populated = await mybook.populate("bookId");
    res.status(201).json({ mybook: populated });
  } catch (err) {
    console.error("Add mybook error:", err);
    res.status(500).json({ message: "Server error adding book" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const mybook = await MyBook.findOne({ userId: req.user._id, bookId });
    if (!mybook) return res.status(404).json({ message: "MyBook not found" });

    mybook.status = status;

    if (status === "Currently Reading" && !mybook.startedAt) {
      mybook.startedAt = new Date();
    }
    if (status === "Read") {
      if (mybook.totalPages) mybook.currentPage = mybook.totalPages;
      mybook.finishedAt = new Date();
    }

    await mybook.save();
    const populated = await mybook.populate("bookId");
    res.json({ mybook: populated });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Server error updating status" });
  }
};

export const updateRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, review } = req.body;

    const mybook = await MyBook.findOne({ userId: req.user._id, bookId });
    if (!mybook) return res.status(404).json({ message: "MyBook not found" });

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });
      mybook.rating = rating;
    }
    if (review !== undefined) mybook.review = review;

    await mybook.save();
    const populated = await mybook.populate("bookId");
    res.json({ mybook: populated });
  } catch (err) {
    console.error("Update rating error:", err);
    res.status(500).json({ message: "Server error updating rating" });
  }
};

// General update endpoint - update currentPage, status, rating, review in one call
export const updateMyBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { currentPage, status, rating, review } = req.body;

    const mybook = await MyBook.findOne({ userId: req.user._id, bookId });
    if (!mybook) return res.status(404).json({ message: "MyBook not found" });

    if (currentPage !== undefined) {
      if (mybook.totalPages && currentPage > mybook.totalPages) return res.status(400).json({ message: "currentPage cannot exceed totalPages" });
      mybook.currentPage = currentPage;
    }
    if (status) {
      mybook.status = status;
      if (status === "Currently Reading" && !mybook.startedAt) mybook.startedAt = new Date();
      if (status === "Read") {
        if (mybook.totalPages) mybook.currentPage = mybook.totalPages;
        mybook.finishedAt = new Date();
      }
    }
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });
      mybook.rating = rating;
    }
    if (review !== undefined) mybook.review = review;

    await mybook.save();
    const populated = await mybook.populate("bookId");
    res.json({ mybook: populated });
  } catch (err) {
    console.error("Update mybook error:", err);
    res.status(500).json({ message: "Server error updating mybook" });
  }
};
