import { FC, ReactNode, createContext, useContext } from "react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useInitUser } from "../Components/Auth/hook";

const AuthContext = createContext<{
  user: User | null;
  userDocData: DocumentData | null;
  authError: any;
}>({
  user: null,
  userDocData: null,
  authError: null,
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, userDocData, authError } = useInitUser();

  return (
    <AuthContext.Provider
      value={{
        user,
        userDocData,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
