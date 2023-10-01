import React, { useEffect, useState } from "react";
import HomeLayout from "../templates/HomeLayout";
import Header from "../molecules/Header";
import MainDisplay from "../organisms/MainDisplay";
import TypingLists from "../organisms/TypingLists";
import Footer from "../atoms/Footer";
import { type HomeProps } from "../../@types/ModuleTypes";

export default function Home(props: HomeProps) {
  const {
    problemNo,
    setProblemNo,
    typingdatas,
  } = props;
  const [isHome, setIsHome] = useState<boolean>(true);

  let mainSelectProblem = {
    title: "選択したタイピングタイトル",
    description: "問題文の文頭を表示する",
    image: "https://source.unsplash.com/random?wallpapers",
    linkText: "This Click Edit…",
  };

  return (
    <HomeLayout
      header={<Header title="OjakoTypingGame" />}
      maindisplay={
        <MainDisplay
          {...props}
          problemNo={problemNo}
          text={mainSelectProblem}
          isHome={isHome}
          setIsHome={setIsHome}
        />
      }
      typinglists={
        <TypingLists typingdatas={typingdatas} setProblemNo={setProblemNo} />
      }
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    />
  );
}
