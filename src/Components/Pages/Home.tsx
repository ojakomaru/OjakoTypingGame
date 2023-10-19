import React from "react";
import { useState } from "react";
import HomeLayout from "../templates/HomeLayout";
import Header from "../molecules/Header";
import { MainDisplay } from "../organisms/MainDisplay";
import TypingLists from "../organisms/TypingLists";
import Footer from "../atoms/Footer";
import { useScroll } from "../../functional/useScroll";

export default function Home() {
  const [ishome, setIsHome] = useState<boolean>(true);
  const [ref, moveTo] = useScroll();

  return (
    <HomeLayout
      header={<Header title="OjakoTypingGame" />}
      maindisplay={
        <MainDisplay
          ref={ref}
          ishome={ishome}
          setIsHome={setIsHome}
        />
      }
      typinglists={<TypingLists moveTo={moveTo} />}
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    />
  );
}
