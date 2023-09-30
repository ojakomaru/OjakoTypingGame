import * as React from "react";
import Paper from "@mui/material/Paper";

import { MainFeaturedPostProps } from "../../@types/ModuleTypes";
import PlayModal from "../../Modal/playModal";
import PlayingGame from "../../TypingPlay/PlayingGame";
import HomeDisplay from "../../Modal/homeDisplay";
import { useLocation } from "react-router-dom";
import MainDiaplayLayout from "../templates/MainDiaplayLayout";

export default function MainDisplay({
  problemNo,
  text,
  isPlaying = false,
  setIsPlaying,
  isHome,
  setIsHome,
}: MainFeaturedPostProps) {
  // // Pathから画面情報を取得
  // let { pathname } = useLocation();
  // console.log(pathname);
  return (
    <MainDiaplayLayout data={text}>
      {isHome ? ( //ホーム画面の場合
        <HomeDisplay text={text} />
      ) : isPlaying ? ( // プレイ画面の場合
        <PlayingGame problemNo={problemNo} />
      ) : (
        <PlayModal setIsPlaying={setIsPlaying} />
      )}
    </MainDiaplayLayout>
  );
}
