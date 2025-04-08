import { useContext, useState, useEffect, createContext } from "react";
import { Account } from "appwrite";
import { account } from "../assets/Appwrite";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo: { email: string; password: string }) => {
    setLoading(true);
    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();

      console.log("accountDeatils", response);

      setUser(accountDetails);
    } catch (error) {}
  };
  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
  };
  const checkUserStatus = async () => {
    try {
      let accountDeatil = await account.get();
      setUser(accountDeatil);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      let resp = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );

      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1
      );
      let accountDetails = await account.get();

      console.log("accountDeatils", response);

      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const ContextData = {
    user,
    loginUser,
    logoutUser,
    checkUserStatus,
    registerUser,
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
