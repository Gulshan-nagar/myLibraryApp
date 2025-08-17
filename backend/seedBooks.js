import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import Book from "./models/bookModel.js";

const seed = async () => {
  try {
    await connectDB();
    const dataPath = path.join(process.cwd(), "data", "books.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const { books } = JSON.parse(raw);

    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("Books seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
