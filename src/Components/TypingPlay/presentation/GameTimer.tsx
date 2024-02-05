import { Timer } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useEffectOnce } from '../../../Hooks';
import { timeFormatting } from '../../../Util/scoreCalc';

const GameTimer = () => {
  const timer = useRef<number>(0); // タイマーのID保管用
  const [timeOfTyping, setTimeOfTyping] = useState(0); // トータルタイム
  useEffectOnce(() => {
    const startTime = new Date().getTime();
    timer.current = window.setInterval(() => {
      setTimeOfTyping(new Date().getTime() - startTime);
    }, 10);
  });

  return (
    <React.Fragment>
      <Timer />
      <Typography>タイム: {timeFormatting(timeOfTyping)}</Typography>
    </React.Fragment>
  );
};

export default GameTimer;
