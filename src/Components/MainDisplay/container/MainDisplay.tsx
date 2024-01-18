import React, { ReactNode } from "react";
import MainDisplayLayout from "../../layout/MainDisplayLayout";
import { PlayModal } from "../presentation";

type MainFeaturedPostProps = {
  isStandby: boolean;
  setIsStandby: (a: boolean) => void;
  children: ReactNode;
};
export const MainDisplay = (props: MainFeaturedPostProps) => {
  const { isStandby, setIsStandby, children } = props;

  return (
    <MainDisplayLayout isPlaying={true}>
      {/* 画面のモードによって内容を出し分ける */}
      {isStandby ? <PlayModal setIsStandby={setIsStandby} /> : children}
    </MainDisplayLayout>
  );
};
