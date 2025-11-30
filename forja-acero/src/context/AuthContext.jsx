import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, email, role }
  const [loading, setLoading] = useState(true);

  // Al montar, leer desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await apiClient.post("/api/v1/auth/login", { email, password });

    const { token, username, role, email: emailResp } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: emailResp, role })
    );

    setUser({ username, email: emailResp, role });

    return { role };
  };

  const register = async (username, email, password, role) => {
    const res = await apiClient.post("/api/v1/auth/register", {
      username,
      email,
      password,
      role,
    });

    const { token, username: uName, role: r, email: emailResp } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ username: uName, email: emailResp, role: r })
    );

    setUser({ username: uName, email: emailResp, role: r });

    return { role: r };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
