import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firestore/firebase";

const AuthContext = createContext({
  currentUser: {},
  userLoggedIn: false,
  loading: true,
  setUserLoggedIn: (value: boolean) => {},
  setCurrentUser: (value: {}) => {},
  setLoading: (value: boolean) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const initializeUser = async (user: any) => {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser({});
      setUserLoggedIn(false);
      router.push("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, initializeUser);
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    setCurrentUser,
    setUserLoggedIn,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
