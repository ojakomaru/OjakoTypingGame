import React, { useState } from "react";
import Keyboard from "../TypingPlay/Keyboard";
import { Container } from "@mui/material";
import Header from "../Components/Header";
import MainDisplay from "../Components/MainDisplay";
import Footer from "../Components/Footer";
import { PlayingProps } from "../@types/PagesTypes";

const Play: React.FC<PlayingProps> = (props) => {
  const { problemNo, setting, score, setScore } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const mainPlayingText = {
    problemNo: problemNo,
    title: "タイピング課題のタイトル",
    description:
      "ここにタイピングする内容が表示され、新しい項目がどんどん更新される。",
    image: "https://source.unsplash.com/random?wallpapers",
    linkText: "Continue reading…",
  };

  return (
    <>
      {/* ホーム画面部分 */}
      <Container maxWidth="lg">
        <Header title="OjakoTypingGame" />
        <main>
          <MainDisplay
            problemNo={problemNo}
            text={mainPlayingText}
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
