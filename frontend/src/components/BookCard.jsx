// src/components/BookCard.jsx
import { useAuth } from "../context/AuthContext";
import { useBooks } from "../context/BooksContext";

export default function BookCard({ book }) {
  const { user } = useAuth();
  const { addToMyBooks } = useBooks();

  const handleClick = () => {
    if (!user) {
      alert("Please login to add books!");
      return;
    }
    addToMyBooks(book._id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
  {/* Fixed height image container */}
  <div className="w-full h-72 bg-gray-100">
    <img
      src={book.coverImage || `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
      alt={book.title}
  className="w-[200px] h-[300px] object-cover rounded-lg shadow-md"
    />
  </div>
  <div className="p-4">
    <h3 className="text-lg font-bold line-clamp-2">{book.title}</h3>
    <p className="text-gray-600">{book.author}</p>
    <p className="text-sm text-gray-500">Pages: {book.totalPages}</p>
    <button
      onClick={handleClick}
      className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
    >
      Want to Read
    </button>
  </div>
</div>

  );
}
