import React, { ReactNode, useState } from "react";
import MainDisplayLayout from "../../layout/MainDisplayLayout";
import { PlayModal, Countdown } from "../presentation";

type MainFeaturedPostProps = {
  isStandby: boolean;
  setIsStandby: (a: boolean) => void;
  children: ReactNode;
};
export const MainDisplay = (props: MainFeaturedPostProps) => {
  const { isStandby, setIsStandby,children } = props;
  // const [count, setCountdown] = useState(3);
  // const SwitchMode = (children: ReactNode) => {
  //   if (isPlaying) {
  //     // if (count > 0) {
  //     //   return <Countdown count={count} setCountdown={setCountdown} />;
  //     // } else {
  //     return children;
  //     // }
  //   } else {
  //     return <PlayModal setIsPlaying={setIsPlaying} />;
  //   }
  // };

  return (
    <MainDisplayLayout isPlaying={true}>
      {/* 画面のモードによって内容を出し分ける */}
      {isStandby ? <PlayModal setIsStandby={setIsStandby} /> : children}
    </MainDisplayLayout>
  );
};
