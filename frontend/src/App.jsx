import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();
  if (authLoading) return <div className="p-8">Checking session...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mybooks" element={
            <PrivateRoute>
              <MyBooks />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
