import React, { useState } from 'react'
import { TypingDataType } from '../../../@types';
import MainDisplayLayout from '../../layout/MainDisplayLayout';
import PlayingGame from '../../TypingPlay/container/PlayingGame';
import { Countdown, PlayModal } from '../presentation';

interface RealTypingDisplayProps  {
  typingdata: TypingDataType;
  isPlaying: boolean;
  setIsPlaying: (a: boolean) => void;
};
const RealTypingDisplay = (props: RealTypingDisplayProps) => {
  const { typingdata, isPlaying, setIsPlaying } = props;
  const [count, setCountdown] = useState(3);
  // 画面のモードによって内容を出し分ける
  const SwitchMode = () => {
    if (isPlaying) {
      if (count > 0) {
        return <Countdown count={count} setCountdown={setCountdown} />;
      } else {
        return (
          <PlayingGame
            typingdata={typingdata}
            setIsPlaying={setIsPlaying}
          />
        );
      }
    } else {
      return <PlayModal setIsPlaying={setIsPlaying} />;
    }
  };

  return (
    <MainDisplayLayout isPlaying={!!isPlaying}>
      {SwitchMode()}
    </MainDisplayLayout>
  );
};

export default RealTypingDisplay