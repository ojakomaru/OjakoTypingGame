import React, { useMemo } from "react";
import useObserveUser from "./useObserveUser";
import useObserveUserDoc from "./useObserveUserDoc";
import useAuthStatus from "./useAuthStatus";

export default function useInitUser() {
  // Authenticationのユーザーを監視する
  const { user, isLoading: isAuthLoading, error: authError } = useObserveUser();

  // ユーザーのドキュメントを監視する
  const {
    userDocData,
    isLoading: isDocLoading,
    error: docError,
  } = useObserveUserDoc(user);

  // ユーザーの状態やタイプを判別する
  const { authStatus, error: userTypeError } = useAuthStatus(user);

  return { user, userDocData, authError };
}
