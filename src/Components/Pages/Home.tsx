import { useState } from "react";
import HomeLayout from "../templates/HomeLayout";
import Header from "../molecules/Header";
import {MainDisplay} from "../organisms/MainDisplay";
import TypingLists from "../organisms/TypingLists";
import Footer from "../atoms/Footer";
import { type HomeProps } from "../../@types/ModuleTypes";
import { useScroll } from "../../functional/useScroll";

export default function Home(props: HomeProps) {
  const { typingdatas } = props;
  const [isHome, setIsHome] = useState<boolean>(true);
  const [ref, moveTo] = useScroll();

  return (
    <HomeLayout
      header={<Header title="OjakoTypingGame" />}
      maindisplay={
        <MainDisplay
          {...props}
          ref={ref}
          isHome={isHome}
          setIsHome={setIsHome}
        />
      }
      typinglists={<TypingLists {...props} moveTo={moveTo} />}
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    />
  );
}
