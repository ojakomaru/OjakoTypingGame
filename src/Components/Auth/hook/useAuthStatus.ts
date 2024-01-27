import React, { useState } from "react";

import { getAuth, signInWithCustomToken, User } from "firebase/auth";

function useAuthStatus(user: User | null) {
  const [authStatus, setAuthStatus] = useState();
  const [error, setError] = useState();
  if (user !== null) {
    // ユーザーオブジェクトは、表示名、電子メールなどの基本的なプロパティを持っています。
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // Firebaseプロジェクト固有のユーザID。を使用しないでください
    // の場合、この値をバックエンドサーバーとの認証に使用します。
    // を使用してください。代わりにUser.getToken()を使用してください。
    const uid = user.uid;
  }
  return { authStatus, error };
}

export default useAuthStatus;
