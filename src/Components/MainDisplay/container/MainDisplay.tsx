import React, { useState } from "react";
import PlayingGame from "../../TypingPlay/container/PlayingGame";
import MainDiaplayLayout from "../../layout/MainDiaplayLayout";
import { TypingDataContext } from "../../../Contexts";
import {
  HomeDisplay,
  SettingExample,
  PlayModal,
  Countdown,
} from "../presentation";

type MainFeaturedPostProps = {
  ishome?: boolean;
  setIsHome?: (a: boolean) => void;
  isSetting?: boolean;
  keyboardInit?: any;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
};

export const MainDisplay = (props: MainFeaturedPostProps) => {
  const {
    ishome,
    setIsHome,
    isSetting,
    keyboardInit,
    isPlaying,
    setIsPlaying,
  } = props;
  const { typingdata } = React.useContext(TypingDataContext);
  const [count, setCountdown] = useState(3);
  // 画面のモードによって内容を出し分ける
  const SwitchMode = () => {
    if (ishome) {
      return <HomeDisplay displayData={typingdata} setIsHome={setIsHome} />;
    } else if (isPlaying) {
      return count > 0 ? (
        <Countdown count={count} setCountdown={setCountdown} />
      ) : (
        <PlayingGame
          typingdata={typingdata}
          setIsPlaying={setIsPlaying}
          keyboardInit={keyboardInit}
        />
      );
    } else if (isSetting) {
      return <SettingExample typingdata={typingdata} />;
    } else {
      return <PlayModal setIsPlaying={setIsPlaying} />;
    }
  };

  return (
    <MainDiaplayLayout isPlaying={!!isPlaying}>
      {SwitchMode()}
    </MainDiaplayLayout>
  );
};
