import React, { useState } from "react";
import Layout from "../layout/Layout";
import TypingLists from "../HomeProblemList/TypingLists";
import MainDiaplayLayout from "../layout/MainDisplayLayout";
import { HomeDisplay } from "../MainDisplay/presentation";
import { TypingDataContext } from "../../Contexts";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Snackbar, SnackbarCloseReason } from "@mui/material";

export default function Home() {
  const { typingdata } = React.useContext(TypingDataContext);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<boolean>(false); // ユーザー情報がfalseであると仮定

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCheckUserInfo = () => {
    // ここでユーザー情報を確認する処理を行う
    // 例えば、データベースからユーザー情報を取得し、条件に応じてsetUserInfoを使用して更新する

    // 仮の確認例として、userInfoがfalseであればポップアップを表示する
    if (!userInfo) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          User information is not complete!
        </Alert>
      </Snackbar>
      <MainDiaplayLayout>
        <HomeDisplay displayData={typingdata} />
      </MainDiaplayLayout>
      <TypingLists />
    </Layout>
  );
}
