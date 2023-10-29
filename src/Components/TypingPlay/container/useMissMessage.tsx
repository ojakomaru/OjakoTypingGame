import React, { ReactNode, useCallback, useState } from "react";
import styled, { css } from "styled-components";

type MissMessageProps = {
  isMiss: boolean;
};
const logURL = `${process.env.PUBLIC_URL}/images/Miss.png`;
const MissMessage = styled.div<MissMessageProps>`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 30%;
  height: 100%;
  ${({ isMiss }) =>
    isMiss
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
  background: url(${logURL}) no-repeat;
  background-size: contain;
`;
/**
 * 画面にMissメッセージを一定時間表示する
 * @returns missMessage: 表示するためのJSX要素
 *          messageShow: メッセージを一定時間表示する関数
 */
export const useMissMessage = (): [ReactNode, () => void] => {
  let hiddenedTime = 700;
  const [miss, setMissFlg] = useState<boolean>(false);
  const messageShow = useCallback(() => {
    setMissFlg(true);
    setTimeout(function () {
      setMissFlg(false);
    }, hiddenedTime);
  }, [miss]);

  return [<MissMessage isMiss={miss} />, messageShow];
};
