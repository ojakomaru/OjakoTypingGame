import React from 'react';
import { styled } from 'styled-components';

type MissMessageProps = {
  $isMiss: boolean;
};
const missUrl = `${process.env.PUBLIC_URL}/images/Miss.png`;
const damageUrl = `${process.env.PUBLIC_URL}/images/damage.png`;
const StyledMissMessage = styled.div<MissMessageProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 40%;
  height: 40%;
  opacity: ${({ $isMiss }) => ($isMiss ? 1 : 0)};
  background: url(${missUrl}) no-repeat;
  background-size: contain;
`;
const StyledMissModal = styled.div<MissMessageProps>`
  position: fixed;
  top: 0;
  left: 0;
  background: url(${damageUrl}) right no-repeat;
  background-size: 35%;
  background-color: rgba(241, 13, 13, 0.3);
  min-height: 100%;
  width: 100%;
  opacity: ${({ $isMiss }) => ($isMiss ? 1 : 0)};
`;
function MissMessage({ $isMiss }: MissMessageProps) {
  return (
    <StyledMissModal $isMiss={$isMiss}>
      <StyledMissMessage $isMiss={$isMiss} />
    </StyledMissModal>
  );
}

export default MissMessage;
