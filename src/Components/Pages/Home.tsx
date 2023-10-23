import React from "react";
import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import Header from "../ui/Header";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import TypingLists from "../HomeProblemList/TypingLists";
import Footer from "../ui/Footer";
import { useScroll } from "../../Hooks/useScroll";
import { Navigation } from "../ui/Navigation/Navigation";

export default function Home() {
  const [ishome, setIsHome] = useState<boolean>(true);
  const [ref, moveTo] = useScroll();
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  return (
    <HomeLayout
      header={
        <Header title="OjakoTypingGame" toggleNavigation={toggleNavigation} />
      }
      maindisplay={
        <MainDisplay ref={ref} ishome={ishome} setIsHome={setIsHome} />
      }
      navigation={<Navigation open={open} handleClose={toggleNavigation} />}
      typinglists={<TypingLists moveTo={moveTo} />}
      footer={
        <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
      }
    />
  );
}
