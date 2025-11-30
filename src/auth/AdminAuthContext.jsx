import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem("adminToken"));

  const login = (newToken) => {
    sessionStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};