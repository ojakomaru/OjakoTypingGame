import { FC, ReactNode, createContext, useContext } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config";

interface AuthContextProps {
  user: User | null | undefined;
  isAuthLoading: boolean;
  authError: any;
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Authenticationのユーザーを監視する
  const [user, isAuthLoading, authError] = useAuthState(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        authError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
