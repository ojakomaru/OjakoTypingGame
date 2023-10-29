
import { useState } from "react";
import { Navigation } from "../ui/Navigation/Navigation";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

const GameSetting = (): JSX.Element => {
  const [isSetting, setIsSetting] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  return (
    <Layout
      header={<Header toggleNavigation={toggleNavigation} />}
      navigation={<Navigation open={open} handleClose={toggleNavigation} />}
      footer={<Footer description="Ojako Typing App var.1.0.0" />}
    >
      <MainDisplay isPlaying={isSetting} setIsPlaying={setIsSetting} />
    </Layout>
  );
};

export default GameSetting;
