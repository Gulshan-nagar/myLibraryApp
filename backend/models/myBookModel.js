import mongoose from "mongoose";

const myBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["Want to Read", "Currently Reading", "Read"],
      default: "Want to Read",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    review: {
      type: String,
      trim: true,
    },
    currentPage: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPages: {
      type: Number,
      min: 1,
    },
    startedAt: {
      type: Date,
    },
    finishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MyBook", myBookSchema);
