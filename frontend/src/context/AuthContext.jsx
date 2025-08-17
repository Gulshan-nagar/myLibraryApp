import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { AUTH } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMe = async () => {
    try {
      setAuthLoading(true);
      const { data } = await axios.get(AUTH.me);
      setUser(data.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const register = async (payload) => {
    const { data } = await axios.post(AUTH.register, payload);
    setUser(data.user);
    return data;
  };

  const login = async (payload) => {
    const { data } = await axios.post(AUTH.login, payload);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await axios.get(AUTH.logout);
    } catch (err) {
      console.warn("logout error", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, register, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}