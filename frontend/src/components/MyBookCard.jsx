import React, { useState } from "react";
import { useBooks } from "../context/BooksContext";


export default function MyBookCard({ mybook }) {
  const { updateMyBook } = useBooks();
  const book = mybook.bookId;
  const [status, setStatus] = useState(mybook.status);
  const [rating, setRating] = useState(mybook.rating || 0);
  const [currentPage, setCurrentPage] = useState(mybook.currentPage || 0);
  const [review, setReview] = useState(mybook.review || "");

  const save = async () => {
    try {
      const payload = { status, rating: rating || undefined, currentPage: Number(currentPage), review };
      await updateMyBook(book._id, payload);
      alert("Saved");
    } catch (err) {
      console.error(err);
      alert("Could not save");
    }
  };

  const setStar = (val) => {
    setRating(val);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex gap-4 items-start">
      <img src={book.coverImage} alt={book.title} className="w-20 h-28 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>

        <div className="mt-3 flex items-center gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-2 py-1 rounded">
            <option>Want to Read</option>
            <option>Currently Reading</option>
            <option>Read</option>
          </select>

          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setStar(n)} className="text-xl">
                {n <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>

          <div>
            <input type="number" min="0" max={book.totalPages || 99999}
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              className="w-24 border px-2 py-1 rounded"
              placeholder="Page" />
            <span className="text-sm text-gray-500 ml-2">/ {book.totalPages || "?"}</span>
          </div>
        </div>

        <div className="mt-3">
          <textarea value={review} onChange={(e) => setReview(e.target.value)}
            className="w-full border rounded px-2 py-1" rows="2" placeholder="Write a review (optional)"/>
        </div>

        <div className="mt-3">
          <button onClick={save} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}