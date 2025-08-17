import React from "react";
import MyBookCard from "../components/MyBookCard";
import { useBooks } from "../context/BooksContext";

export default function MyBooks() {
  const { myBooks, loading } = useBooks();

  if (loading) return <div>Loading your books...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      {myBooks.length === 0 ? (
        <p>You have not added any books yet.</p>
      ) : (
        <div className="grid gap-4">
          {myBooks.map(mb => <MyBookCard key={mb._id} mybook={mb} />)}
        </div>
      )}
    </div>
  );
}