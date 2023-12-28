import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  box-sizing: border-box;
`;
const StyledResultScoreWrapper = styled.div`
  color: #2d0303;
  border: 2px solid #333;
  border-radius: 10px;
  width: 530px;
  height: 430px;
  background-color: #fff;
  font-size: 20px;
  position: relative;
`;
const StyledResultTitle = styled.div`
  padding-top: 10px;
  text-align: center;
  min-height: 74px;
  font-size: 28px;
  font-family: "mtjFontRound";
  transform: rotate(0.001deg);
`;
const StyledResultActions = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
`;

interface ResultScoreLayoutProps {
  resultScore: ReactNode;
  resultActions: ReactNode;
}
const ResultScoreLayout = ({
  resultScore,
  resultActions,
}: ResultScoreLayoutProps) => {
  return (
    <Wrapper>
      <StyledResultActions>{resultActions}</StyledResultActions>
      <StyledResultScoreWrapper>
        <StyledResultTitle>{"タイピング結果"}</StyledResultTitle>
        {resultScore}
      </StyledResultScoreWrapper>
    </Wrapper>
  );
};

export default ResultScoreLayout;
