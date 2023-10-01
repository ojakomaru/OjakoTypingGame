import { HomeDisplayProps } from "../../@types/ModuleTypes";
import PlayModal from "../molecules/playModal";
import PlayingGame from "../../TypingPlay/PlayingGame";
import HomeDisplay from "../molecules/homeDisplay";
import MainDiaplayLayout from "../templates/MainDiaplayLayout";
import Home from "../Pages/Home";
import { Ref, RefObject, forwardRef, useEffect } from "react";

type G_Props = React.ComponentPropsWithRef<typeof Home>;
type MainFeaturedPostProps = {
  ref: RefObject<HTMLDivElement>;
  isHome?: boolean;
  setIsHome?: (a: boolean) => void;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
} & G_Props;

function MainDisplayChild(props: MainFeaturedPostProps, ref: Ref<HTMLDivElement>) {
  const {
    isPlaying = false,
    setIsPlaying,
    isHome,
    typingdata,
    setTypingData,
    typingdatas,
  } = props;
  // メイン画面にタイピングデータを渡す
  useEffect(() => {
    if (typingdatas) {
      const rnd = Math.floor(Math.random() * typingdatas.length);
      setTypingData(typingdatas[rnd]);
      console.log(typingdata);
    }
  }, []);

  return (
    <div ref={ref}>
      <MainDiaplayLayout >
        {isHome ? ( //ホーム画面の場合
          <HomeDisplay displayData={typingdata} />
        ) : isPlaying ? ( // プレイ画面の場合
          <PlayingGame />
        ) : (
          <PlayModal setIsPlaying={setIsPlaying} />
        )}
      </MainDiaplayLayout>
    </div>
  );
}
export const MainDisplay = forwardRef<HTMLDivElement, MainFeaturedPostProps>(
  MainDisplayChild
);
