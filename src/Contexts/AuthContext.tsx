import { FC, ReactNode, createContext, useContext } from "react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import {
  useInitUser,
  useObserveUser,
  useObserveUserDoc,
} from "../Components/Auth/hook";

interface AuthContextProps {
  user: User | null;
  isAuthLoading: boolean;
  authError: any;
  userDocData: DocumentData | null;
  isDocLoading: boolean;
  docError: any;
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

  // Authenticationのユーザーを監視する
  const { user, isLoading: isAuthLoading, error: authError } = useObserveUser();
  // ユーザーのドキュメントを監視する
  const {
    userDocData,
    isLoading: isDocLoading,
    error: docError,
  } = useObserveUserDoc(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        authError,
        userDocData,
        isDocLoading,
        docError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
