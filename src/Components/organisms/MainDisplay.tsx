import { HomeDisplayProps } from "../../@types/ModuleTypes";
import PlayModal from "../../Modal/playModal";
import PlayingGame from "../../TypingPlay/PlayingGame";
import HomeDisplay from "../../Modal/homeDisplay";
import MainDiaplayLayout from "../templates/MainDiaplayLayout";
import Home from "../Pages/Home";
import { useEffect } from "react";

type G_Props = React.ComponentPropsWithRef<typeof Home>;
type MainFeaturedPostProps = {
  problemNo: string;
  text: HomeDisplayProps;
  isHome?: boolean;
  setIsHome?: (a: boolean) => void;
  startText?: string;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
} & G_Props;

export default function MainDisplay(props: MainFeaturedPostProps) {
  const {
    problemNo,
    text,
    isPlaying = false,
    setIsPlaying,
    isHome,
    typingdata,
    setTypingData,
    typingdatas,
  } = props;
  // メイン画面にタイピングデータを渡す
  useEffect(() => {
    const rnd = Math.floor(Math.random() * typingdatas.length);
    setTypingData(typingdatas[rnd]);
    console.log(typingdata);
  }, [typingdata]);
  return (
    <MainDiaplayLayout data={text}>
      {isHome ? ( //ホーム画面の場合
        <HomeDisplay displayData={typingdata} />
      ) : isPlaying ? ( // プレイ画面の場合
        <PlayingGame problemNo={problemNo} />
      ) : (
        <PlayModal setIsPlaying={setIsPlaying} />
      )}
    </MainDiaplayLayout>
  );
}
