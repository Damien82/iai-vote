import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: { nom: string; prenom: string; matricule: string } | null;
  login: (token: string, userData: { nom: string; prenom: string; matricule: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<AuthContextType["user"]>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  const login = (newToken: string, userData: { nom: string; prenom: string; matricule: string }) => {
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
