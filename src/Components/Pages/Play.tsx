import React, { useState } from "react";
import Keyboard from "../../TypingPlay/Keyboard";
import { Container } from "@mui/material";
import Header from "../molecules/Header";
import { MainDisplay } from "../organisms/MainDisplay";
import Footer from "../atoms/Footer";
import { PlayingProps } from "../../@types";
import { useLocation } from "react-router-dom";

const Play: React.FC<PlayingProps> = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // 繊維元からデータを取得
  const typingdata = useLocation().state;

  return (
    <>
      <Container maxWidth="lg">
        <Header title="OjakoTypingGame" />
        <main>
          <MainDisplay
            {...props}
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
