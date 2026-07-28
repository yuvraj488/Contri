import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "@/services/authService";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
  localStorage.removeItem("token");

  setUser(null);

  navigate("/login", { replace: true });
};

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile();

        setUser(response.user);
      } catch (error) {
        console.error("Session restore failed:", error);

        localStorage.removeItem("token");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}