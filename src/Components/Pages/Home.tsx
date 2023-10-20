import React from "react";
import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import Header from "../ui/Header";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import TypingLists from "../HomeProblemList/TypingLists";
import Footer from "../ui/Footer";
import { useScroll } from "../../Hooks/useScroll";

export default function Home() {
  const [ishome, setIsHome] = useState<boolean>(true);
  const [ref, moveTo] = useScroll();

  return (
    <HomeLayout
      header={<Header title="OjakoTypingGame" />}
      maindisplay={
        <MainDisplay ref={ref} ishome={ishome} setIsHome={setIsHome} />
      }
      typinglists={<TypingLists moveTo={moveTo} />}
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    />
  );
}
