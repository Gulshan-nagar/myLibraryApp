import React, { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useBooks } from "../context/BooksContext";

export default function Home() {
  const { books, fetchBooks, loading } = useBooks();

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map(b => <BookCard key={b._id} book={b} />)}
      </div>
    </div>
  );
}
