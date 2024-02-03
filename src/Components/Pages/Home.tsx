import React from "react";
import Layout from "../layout/Layout";
import TypingLists from "../HomeProblemList/TypingLists";
import MainDiaplayLayout from "../layout/MainDisplayLayout";
import { HomeDisplay } from "../MainDisplay/presentation";
import { TypingDataContext, useAuthContext } from "../../Contexts";
import AlertSnackbar from "../ui/Snackbar/AlertSnackbar";

export default function Home() {
  const { typingdata } = React.useContext(TypingDataContext);
  const { user } = useAuthContext();

  return (
    <Layout>
      <AlertSnackbar
        openFlg={!user?.emailVerified}
        message={"受信メールからメール認証をお願い致します"}
      />
      <MainDiaplayLayout>
        <HomeDisplay displayData={typingdata} />
      </MainDiaplayLayout>
      <TypingLists />
    </Layout>
  );
}
