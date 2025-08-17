import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
     isbn: { type: String },
    coverImage: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    totalPages: {
      type: Number,
      required: [true, "Total pages is required"],
      min: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
