import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../../Config";
import GithubButton from "./GithubButton";
import GoogleButton from "./GoogleButton";
import { useCookei } from "./hook";

// const OWNER = "ojakomaru";
// const REPO = "OjakoTypingGame";

function SocialLogin() {
  const { handleLogin } = useCookei("githubToken");
  const [provider, setProvider] = useState<GithubAuthProvider | null>(null);
  // GitHub OAuth Provider ObjectのInstanceを作成
  useEffect(() => {
    if (provider === null) {
      githubProvider.addScope("repo"); // 既定ではユーザー自身のemailを取得するスコープしか付与されない。必要に応じてスコープを追加する
      setProvider(githubProvider);
    }
  }, [provider]);

  // ポップアップによるサインインを実施し、成功したらアクセストークンを取得する
  const signInWithGithub = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (credential && credential.accessToken) {
        // 発行されたトークンをCookeiとStateに保存
        handleLogin(credential.accessToken);
      }
    });
  };

  // アクセストークンを使用してGitHub API（GET /Issues）へリクエストする
  // useEffect(() => {
  //   if (token !== null) {
  //     fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues`, {
  //       headers: {
  //         Authorization: `token ${token}`,
  //         Accept: "application / vnd.github.v3 + json",
  //       },
  //     }).then((result) => {
  //       result.json().then((result) => {
  //         console.log(result);
  //       });
  //     });
  //   }
  // }, [token]);

  const signInWithGoogle = () => {
    // firebaseを使ってGoogleでログインする
    signInWithPopup(auth, googleProvider);
  };
  return (
    <Box sx={{ my: 2, display: "flex", gap: 1 }}>
      <GoogleButton onGoogleSignIn={signInWithGoogle} />
      <GithubButton onGithubSignIn={signInWithGithub} />
    </Box>
  );
}

export default SocialLogin;
