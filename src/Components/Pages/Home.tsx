import React, { useEffect, useState } from "react";
import HomeLayout from "../templates/HomeLayout";
import Header from "../Header";
import MainDisplay from "../MainDisplay";
import TypingLists from "../organisms/TypingLists";
import Footer from "../Footer";
import {
  type HomeProps,
  InputType,
} from "../../@types/ModuleTypes";

export default function Home({
  problemNo,
  setProblemNo,
  setting,
  score,
  setScore,
}: HomeProps) {
  const [isHome, setIsHome] = useState<boolean>(true);
  let typingdatas: InputType[] = [];

  if (localStorage.hasOwnProperty("typingData")) {
    // 今回登録する配列の結合。。（一旦重複しても構わない仕様として実装する）
    typingdatas = JSON.parse(localStorage.getItem("typingData") as string);
  }

  // メイン画面にタイピングデータを渡す
  useEffect(() => {
    const rnd = Math.floor(Math.random() * typingdatas.length);
    setProblemNo(typingdatas[rnd].id);
    let typingdata = typingdatas.find((obj) => obj.id === typingdatas[rnd].id);
  }, [problemNo]);

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
          problemNo={problemNo}
          text={mainSelectProblem}
          isHome={isHome}
          setIsHome={setIsHome}
        />
      }
      typinglists={<TypingLists typingdatas={typingdatas} setProblemNo={setProblemNo} />}
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    />
  );
}
