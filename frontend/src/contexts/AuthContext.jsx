import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ApiService from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      ApiService.setToken(storedToken);
    }
    setTokenChecked(true);
  }, []);

  const login = async (email, password) => {
    const data = await ApiService.login(email, password);
    setUser(data.user);
    localStorage.setItem("authUser", JSON.stringify(data.user));
    return data;
  };

  const signup = async (email, password) => {
    const data = await ApiService.signup(email, password);
    setUser(data.user);
    localStorage.setItem("authUser", JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    ApiService.logout();
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
      tokenChecked,
    }),
    [user, tokenChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
