import Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ books });
  } catch (err) {
    console.error("Get books error:", err);
    res.status(500).json({ message: "Server error fetching books" });
  }
};
