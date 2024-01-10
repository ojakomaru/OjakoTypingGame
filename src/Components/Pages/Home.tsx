import React from "react";
import Layout from "../layout/Layout";
import TypingLists from "../HomeProblemList/TypingLists";
import MainDiaplayLayout from "../layout/MainDisplayLayout";
import { HomeDisplay } from "../MainDisplay/presentation";
import { TypingDataContext } from "../../Contexts";

export default function Home() {
  const { typingdata } = React.useContext(TypingDataContext);
  return (
    <Layout>
      <MainDiaplayLayout>
        <HomeDisplay displayData={typingdata} />
      </MainDiaplayLayout>
      <TypingLists />
    </Layout>
  );
}
