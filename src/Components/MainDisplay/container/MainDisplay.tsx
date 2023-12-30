import React from "react";
import PlayModal from "../presentation/playModal";
import PlayingGame from "../../TypingPlay/container/PlayingGame";
import HomeDisplay from "../presentation/homeDisplay";
import MainDiaplayLayout from "../../layout/MainDiaplayLayout";
import { TypingDataContext } from "../../../Contexts";
import SettingExample from "../presentation/SettingExample";

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

  // 画面のモードによって内容を出し分ける
  const SwitchMode = () => {
    if (ishome) {
      return <HomeDisplay displayData={typingdata} setIsHome={setIsHome} />;
    } else if (isPlaying) {
      return (
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
