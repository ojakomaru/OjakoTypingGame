import React, { useState } from "react";
import Keyboard from "../../TypingPlay/Keyboard";
import { Container } from "@mui/material";
import Header from "../molecules/Header";
import {MainDisplay} from "../organisms/MainDisplay";
import Footer from "../atoms/Footer";
import { PlayingProps } from "../../@types/ModuleTypes";

const Play: React.FC<PlayingProps> = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <Container maxWidth="lg">
        <Header title="OjakoTypingGame" />
        <main>
          <MainDisplay
            {...props}
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
