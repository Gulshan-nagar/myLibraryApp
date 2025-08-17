import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { BOOKS, MYBOOKS } from "../utils/apiPaths";
import { useAuth } from "./AuthContext";

const BooksContext = createContext();
export const useBooks = () => useContext(BooksContext);

export default function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(BOOKS.all);
      setBooks(data.books || []);
    } catch (err) {
      console.error("fetchBooks", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyBooks = async () => {
    if (!user) {
      setMyBooks([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(MYBOOKS.base);
      // Filter out invalid myBooks entries where bookId is null
      const validMyBooks = (data.mybooks || []).filter((m) => m.bookId);
      setMyBooks(validMyBooks);
    } catch (err) {
      console.error("fetchMyBooks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchMyBooks();
  }, [user]);

  const addMyBook = async (bookId) => {
    const { data } = await axios.post(MYBOOKS.add(bookId));
    await fetchMyBooks();
    return data.mybook;
  };

  const updateMyBook = async (bookId, payload) => {
    const { data } = await axios.patch(MYBOOKS.update(bookId), payload);
    await fetchMyBooks();
    return data.mybook;
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        myBooks,
        loading,
        fetchBooks,
        fetchMyBooks,
        addMyBook,
        updateMyBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
