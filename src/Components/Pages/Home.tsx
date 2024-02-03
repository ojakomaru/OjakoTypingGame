import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import TypingLists from "../HomeProblemList/TypingLists";
import MainDiaplayLayout from "../layout/MainDisplayLayout";
import { HomeDisplay } from "../MainDisplay/presentation";
import { TypingDataContext, useAuthContext } from "../../Contexts";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export default function Home() {
  const { typingdata } = React.useContext(TypingDataContext);
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    if (!!user) setOpen(true);
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          ユーザー認証がまだ完了していません。
          受信メールからユーザーメール認証をお願い致します。
        </Alert>
      </Snackbar>
      <MainDiaplayLayout>
        <HomeDisplay displayData={typingdata} />
      </MainDiaplayLayout>
      <TypingLists />
    </Layout>
  );
}
