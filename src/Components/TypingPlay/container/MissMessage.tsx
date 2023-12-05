import React from 'react'
import { css, styled } from 'styled-components';

type MissMessageProps = {
  $isMiss: boolean;
};
const logURL = `${process.env.PUBLIC_URL}/images/Miss.png`;
const StyledMissMessage = styled.div<MissMessageProps>`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 30%;
  height: 100%;
  ${({ $isMiss }) =>
    $isMiss
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
  background: url(${logURL}) no-repeat;
  background-size: contain;
`;
function MissMessage({ $isMiss }: MissMessageProps) {
  return <StyledMissMessage $isMiss={$isMiss} />;
}

export default MissMessage