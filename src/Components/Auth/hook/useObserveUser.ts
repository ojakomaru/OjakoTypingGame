import { onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../Config";
import useEffectOnce from "../../../Hooks/useEffectOnce";

const useObserveUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  // 正常にユーザーを取得できた場合の処理
  const handleUser = (user: User | null) => {
    if (user !== null) {
      if (user.emailVerified === true) {
        setUser(user);
        setIsLoading(false);
      }
    }
  };

  // ユーザーが取得できなかったときの処理
  const handleError = (error: Error) => {
    setError(error);
    setIsLoading(false);
  };

  useEffectOnce(() => {
    setIsLoading(true);
    // 監視するユーザーを取得
    const unsubscribed = onAuthStateChanged(auth, handleUser, handleError);
    return () => {
      unsubscribed();
    };
  });

  return { user, isLoading, error };
};

export default useObserveUser;
