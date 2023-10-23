import React, { useState } from "react";
import Keyboard from "../TypingPlay/presentation/Keyboard";
import { Container } from "@mui/material";
import Header from "../ui/Header";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Footer from "../ui/Footer";
import { useLocation } from "react-router-dom";
import { TypingDataContext } from "../../Contexts/TypingDataContext";

const Play: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { typingdata } = React.useContext(TypingDataContext);
  // 繊維元からデータを取得※useContextの使用につ寄付用となったためコメント化
  // const typingdata = useLocation().state;

  return (
    <>
      <Container maxWidth="lg">
        <Header title="OjakoTypingGame"  />
        <main>
          <MainDisplay
            typingdata={typingdata}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <Keyboard inputKey="k" />
        </main>
      </Container>
      <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
    </>
  );
};
export default Play;
