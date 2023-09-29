import React from "react";
import HomeLayout from "../templates/HomeLayout";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import MainDisplay from "../MainDisplay";
import TypingLists from "../ProblemList";

const HomePage = () => {
  return (
    <HomeLayout
      header={<Header title="OjakoTypingGame" />}
      maindisplay={<MainDisplay />}
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    >
      <TypingLists />
    </HomeLayout>
  );
};

export default HomePage;