import React, { useEffect, useState } from "react";

const useCountdown = (
  isStandby: boolean,
  setIsPlaying: (a: boolean) => void
) => {
  const [count, setCountdown] = useState(3);
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (!isStandby) {
        if (count === 1) {
          setIsPlaying(true);
          clearInterval(countDownInterval);
        }
        if (count && count > 0) {
          setCountdown(count - 1);
        }
      }
    }, 1000);
    return () => clearInterval(countDownInterval);
  }, [count, isStandby]);
  return { count };
};

export { useCountdown };
