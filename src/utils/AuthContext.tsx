import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import { Models } from "appwrite";
import { account } from "../assets/Appwrite";
import { ID } from "appwrite";

type loginInfo = {
  email: string;
  password: string;
};

type registerInfo = {
  email: string;
  password1: string;
  name: string;
};

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  loginUser: (info: loginInfo) => Promise<void>;
  logoutUser: () => Promise<void>;
  checkUserStatus: () => Promise<void>;
  registerUser: (info: registerInfo) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (
    { email, password }: loginInfo,
    setError?: (
      name: "password",
      error: { type: string; message: string }
    ) => void
  ) => {
    setLoading(true);
    try {
      let response = await account.createEmailPasswordSession(email, password);
      let accountDetails = await account.get();

      console.log("accountDeatils", response);

      setUser(accountDetails);
    } catch (error: any) {
      console.log("Login error:", error);

      if (setError) {
        setError("password", {
          type: "manual",
          message: "Incorrect email or password.",
        });
      }
    }

    setLoading(false);
  };
  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log("Logout Failed ", error);
    }
  };
  const checkUserStatus = async () => {
    setLoading(true);
    try {
      let accountDeatil = await account.get();
      setUser(accountDeatil);
    } catch (error) {
      // setUser(null);
      console.log(error);
    }
    setLoading(false);
  };

  const registerUser = async ({ email, password1, name }: registerInfo) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password1, name);

      await account.createEmailPasswordSession(email, password1);
      let accountDetails = await account.get();

      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const ContextData: AuthContextType = {
    user,
    loginUser,
    logoutUser,
    checkUserStatus,
    registerUser,
    loading,
  };
  return (
    <AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
