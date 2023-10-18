import React from "react";
import { useState } from "react";
import HomeLayout from "../templates/HomeLayout";
import Header from "../molecules/Header";
import {MainDisplay} from "../organisms/MainDisplay";
import TypingLists from "../organisms/TypingLists";
import Footer from "../atoms/Footer";
import { type HomeProps } from "../../@types/";
import { useScroll } from "../../functional/useScroll";
import { TypingDataContext } from "../../Contexts/AppContext";

export default function Home(props: HomeProps) {
  const { typingdata } = React.useContext(TypingDataContext);
  const [ishome, setIsHome] = useState<boolean>(true);
  const [ref, moveTo] = useScroll();

  console.log(typingdata);
  return (
    <HomeLayout
      header={<Header title="OjakoTypingGame" />}
      maindisplay={
        <MainDisplay {...props} ref={ref} ishome={ishome} setIsHome={setIsHome} />
      }
      typinglists={<TypingLists {...props} moveTo={moveTo} />}
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    />
  );
}
