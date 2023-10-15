
import PlayModal from "../molecules/playModal";
import PlayingGame from "../../TypingPlay/PlayingGame";
import HomeDisplay from "../molecules/homeDisplay";
import MainDiaplayLayout from "../templates/MainDiaplayLayout";
import Home from "../Pages/Home";
import { Ref, RefObject, forwardRef } from "react";

type G_Props = React.ComponentPropsWithRef<typeof Home>;
type MainFeaturedPostProps = {
  ref?: RefObject<HTMLDivElement>;
  ishome?: boolean;
  setIsHome?: (a: boolean) => void;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
} & G_Props;

function MainDisplayCore(
  props: MainFeaturedPostProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    ishome,
    setIsHome,
    isPlaying = false,
    setIsPlaying,
    typingdata,
  } = props;

  // 画面のモードによって内容を出し分ける
  const SwitchMode = () => {
    if (ishome) {
      return <HomeDisplay displayData={typingdata} setIsHome={setIsHome} />;
    } else if (isPlaying) {
      return <PlayingGame typingdata={typingdata} />;
    } else {
      return <PlayModal setIsPlaying={setIsPlaying} />;
    }
  };

  return (
    <div ref={ref}>
      <MainDiaplayLayout isPlaying={isPlaying} >{SwitchMode()}</MainDiaplayLayout>
    </div>
  );
}
export const MainDisplay = forwardRef<HTMLDivElement, MainFeaturedPostProps>(
  MainDisplayCore
);
