import { useCallback, useState } from "react";
import Cookies from "js-cookie";
import { useEffectOnce } from "../../../Hooks";

const useCookei = (tokenName: string) => {
  const [token, setToken] = useState(tokenName);

  useEffectOnce(() => {
    // アプリ起動時にCookieからトークンを読み込む
    const savedToken = Cookies.get(tokenName);
    if (savedToken) {
      setToken(savedToken);
    }
  });

  const handleLogin = useCallback(
    (newToken: string) => {
      Cookies.set(tokenName, newToken);
      setToken(newToken);
    },
    [token]
  );

  const handleLogout = (): void => {
    // Cookieからトークンを削除
    Cookies.remove(tokenName);
    setToken("");
  };

  return { token, handleLogin, handleLogout };
};

export default useCookei;
