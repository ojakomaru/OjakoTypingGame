import React, { useState } from "react";
import Keyboard from "../../TypingPlay/Keyboard";
import { Container } from "@mui/material";
import Header from "../molecules/Header";
import {MainDisplay} from "../organisms/MainDisplay";
import Footer from "../atoms/Footer";
import { PlayingProps } from "../../@types/ModuleTypes";

const Play: React.FC<PlayingProps> = (props) => {
  // const { problemNo } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const mainPlayingText = {
    problemNo: "problemNo",
    title: "タイピング課題のタイトル",
    description:
      "ここにタイピングする内容が表示され、新しい項目がどんどん更新される。",
    image: "https://source.unsplash.com/random?wallpapers",
    linkText: "Continue reading…",
  };

  return (
    <>
      {/* ホーム画面部分 */}
      {/* <Container maxWidth="lg">
        <Header title="OjakoTypingGame" />
        <main>
          <MainDisplay
            // {...props}
            problemNo={problemNo}
            text={mainPlayingText}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <Keyboard inputKey="k" />
        </main>
      </Container>
      <Footer title="Footer" description="Ojako Typing App var.1.0.0" /> */}
    </>
  );
};
export default Play;
