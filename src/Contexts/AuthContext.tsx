import { FC, ReactNode, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Config';
import LoadingSpiner from '../Components/layout/LoadingSpiner';

interface AuthContextProps {
  user: User | null | undefined;
  isAuthLoading: boolean;
  authError: any;
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Authenticationのユーザーを監視する
  const [user, isAuthLoading, authError] = useAuthState(auth);

  if (isAuthLoading) return <LoadingSpiner message={'ユーザー情報取得...'} />;
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
