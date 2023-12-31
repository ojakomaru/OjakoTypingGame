import React, { useCallback, useEffect, useState } from "react";

const useCountdown = (
  countTime: number | null,
  setCountTime: (arg0: number) => void
) => {
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (countTime === 0) {
        clearInterval(countDownInterval);
      }
      if (countTime && countTime > 0) {
        setCountTime(countTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, [countTime]);
};

export { useCountdown };
