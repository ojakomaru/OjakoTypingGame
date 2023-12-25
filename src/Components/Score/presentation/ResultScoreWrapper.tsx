import React, { ReactNode } from "react";
import { styled } from "styled-components";

const StyledResultScoreWrapper = styled.div`
  color: #2d0303;
  border: 2px solid #333;
  border-radius: 10px;
  width: 530px;
  height: 430px;
  background-color: #fff;
  font-size: 20px;
  left: 180px;
  top: 9px;
`;
const StyledResultTitle = styled.div`
  padding-top: 10px;
  text-align: center;
  min-height: 74px;
  font-size: 28px;
  font-family: "mtjFontRound";
  transform: rotate(0.001deg);
`;
const ResultScoreWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StyledResultScoreWrapper>
      <StyledResultTitle>{"タイピング結果"}</StyledResultTitle>
      {children}
    </StyledResultScoreWrapper>
  );
};

export default ResultScoreWrapper;
