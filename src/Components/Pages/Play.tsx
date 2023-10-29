import React, { useState } from "react";
import Keyboard from "../TypingPlay/presentation/Keyboard";
import Header from "../ui/Header";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Footer from "../ui/Footer";
import { TypingDataContext } from "../../Contexts/TypingDataContext";
import { Navigation } from "../ui/Navigation/Navigation";
import Layout from "../layout/Layout";

const Play: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { typingdata } = React.useContext(TypingDataContext);
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  return (
    <Layout
      header={<Header toggleNavigation={toggleNavigation} />}
      navigation={<Navigation open={open} handleClose={toggleNavigation} />}
      footer={<Footer description="Ojako Typing App var.1.0.0" />}
    >
      <MainDisplay
        typingdata={typingdata}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Keyboard inputKey="k" />
    </Layout>
  );
};
export default Play;
