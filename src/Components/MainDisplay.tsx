import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container, rgbToHex } from "@mui/material";
import { MainFeaturedPostProps } from "../@types/ModuleTypes";
import PlayModal from "../Modal/playModal";
import PlayingGame from "../TypingPlay/PlayingGame";
import HomeDisplay from "../Modal/homeDisplay";
import { useLocation } from "react-router-dom";

export default function MainDisplay({
  problemNo,
  text,
  isPlaying = false,
  setIsPlaying,
  isHome,
  setIsHome,
}: MainFeaturedPostProps) {
  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 2,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${text.image})`,
        }}
      >
        {<img style={{ display: "none" }} src={text.image} alt={text.title} />}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        {isHome ? ( //ホーム画面の場合
          <HomeDisplay text={text} />
        ) : isPlaying ? ( // プレイ画面の場合
          <PlayingGame problemNo={problemNo} />
        ) : (
          <PlayModal setIsPlaying={setIsPlaying} />
        )}
      </Paper>
    </Container>
  );
}
