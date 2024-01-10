import React, { ReactNode, useState } from "react";
import MainDisplayLayout from "../../layout/MainDisplayLayout";
import { PlayModal, Countdown } from "../presentation";

type MainFeaturedPostProps = {
  isPlaying: boolean;
  setIsPlaying: (a: boolean) => void;
  children: ReactNode;
};
export const MainDisplay = (props: MainFeaturedPostProps) => {
  const { isPlaying, setIsPlaying, children } = props;
  const [count, setCountdown] = useState(3);
  // 画面のモードによって内容を出し分ける
  const SwitchMode = (children: ReactNode) => {
    if (isPlaying) {
      if (count > 0) {
        return <Countdown count={count} setCountdown={setCountdown} />;
      } else {
        return children;
      }
    } else {
      return <PlayModal setIsPlaying={setIsPlaying} />;
    }
  };

  return (
    <MainDisplayLayout isPlaying={isPlaying}>
      {SwitchMode(children)}
    </MainDisplayLayout>
  );
};
