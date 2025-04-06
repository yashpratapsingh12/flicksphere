import { useContext, useState, useEffect, createContext } from "react";
import { Account } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const loginUser = () => {};
  const logoutUser = () => {};
  const checkUserStatus = () => {};

  const ContextData = {
    user,
    loginUser,
    logoutUser,
    checkUserStatus,
  };
  return (
    <AuthContext.Provider value={ContextData}>
      {loading ? <p>...Loading</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
