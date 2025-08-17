import { useAuth } from "../context/AuthContext";
import { useBooks } from "../context/BooksContext";

export default function BookCard({ book }) {
  const { user } = useAuth();
  const { myBooks, addMyBook } = useBooks();

  // Optional chaining to prevent crash if bookId is null
  const alreadyAdded = myBooks.some((m) => m.bookId?._id === book._id);

  const handleClick = async () => {
    if (!user) {
      alert("Please login to add books!");
      return;
    }
    if (alreadyAdded) {
      alert("Book already in your list!");
      return;
    }

    try {
      await addMyBook(book._id);
      alert("Book added to your list!");
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      <div className="w-full h-72 bg-gray-100 flex justify-center items-center">
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
          className={`mt-2 w-full py-2 rounded text-white ${
            alreadyAdded ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={alreadyAdded}
        >
          {alreadyAdded ? "Already Added" : "Want to Read"}
        </button>
      </div>
    </div>
  );
}
