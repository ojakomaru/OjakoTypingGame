import React from "react";
import styled from "styled-components";

const StyledScore = styled.div<{ isBest: boolean }>`
  position: absolute;
  left: 0px;
  top: 180px;
  margin-left: 10px;
  border-bottom: 1px double #333;
  width: 500px;
  padding: 0 5px;
  font-size: 42px;
  padding-bottom: 6px;
`;
const StyledScoreItem = styled.span<{ align: string }>`
  text-align: ${({ align }) => align};
  font-size: 42px;
  width: 230px;
  display: inline-block;
  font-family: "mtjFontRound";
`;

const Score = ({ isBest, score }: { isBest: boolean; score: number }) => {
  return (
    <StyledScore isBest={isBest}>
      <StyledScoreItem align={"left"}>Score</StyledScoreItem>
      <StyledScoreItem align={"right"}>{score}</StyledScoreItem>
    </StyledScore>
  );
};

export default Score;
