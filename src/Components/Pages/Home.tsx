import React from "react";
import { useState } from "react";
import Layout from "../layout/Layout";
import Header from "../ui/Header";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import TypingLists from "../HomeProblemList/TypingLists";
import Footer from "../ui/Footer";
import { useScroll } from "../../Hooks/useScroll";
import { Navigation } from "../ui/Navigation/Navigation";

export default function Home() {
  const [ishome, setIsHome] = useState<boolean>(true);
  const [ref, moveTo] = useScroll(); //クリック箇所にスクロールするも現在利用していない
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  return (
    <Layout
      header={<Header toggleNavigation={toggleNavigation} />}
      navigation={<Navigation open={open} handleClose={toggleNavigation} />}
      footer={<Footer description="Ojako Typing App var.1.0.0" />}
    >
      <MainDisplay ishome={ishome} setIsHome={setIsHome} />
      <TypingLists />
    </Layout>
  );
}
