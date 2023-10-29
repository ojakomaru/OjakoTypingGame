import React from "react";
import PlayModal from "../presentation/playModal";
import PlayingGame from "../../TypingPlay/container/PlayingGame";
import HomeDisplay from "../presentation/homeDisplay";
import MainDiaplayLayout from "../../layout/MainDiaplayLayout";
import { TypingDataType } from "../../../@types";
import { TypingDataContext } from "../../../Contexts/TypingDataContext";
import SettingForm from "../../settingForm/SettingForm";

type MainFeaturedPostProps = {
  typingdata?: TypingDataType;
  ishome?: boolean;
  setIsHome?: (a: boolean) => void;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
  isSetting?: boolean;
  setIsSetting?: (a: boolean) => void;
};

export const MainDisplay = (props: MainFeaturedPostProps) => {
  const {
    ishome,
    setIsHome,
    isPlaying = false,
    setIsPlaying,
    isSetting,
    setIsSetting,
  } = props;
  const { typingdata } = React.useContext(TypingDataContext);

  // 画面のモードによって内容を出し分ける
  const SwitchMode = () => {
    if (ishome) {
      return <HomeDisplay displayData={typingdata} setIsHome={setIsHome} />;
    } else if (isPlaying) {
      return <PlayingGame typingdata={typingdata} />;
    } else if (isSetting) {
      return <SettingForm setIsSetting={setIsSetting} />;
    } else {
      return <PlayModal setIsPlaying={setIsPlaying} />;
    }
  };

  return (
    <MainDiaplayLayout isPlaying={isPlaying}>{SwitchMode()}</MainDiaplayLayout>
  );
};
