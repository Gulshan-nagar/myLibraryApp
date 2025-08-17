// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold text-blue-400">
        📚 My Library
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        {user && <Link to="/mybooks" className="hover:text-blue-300">My Books</Link>}
        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-300">Login</Link>
            <Link to="/register" className="hover:text-blue-300">Register</Link>
          </>
        ) : (
          <>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}