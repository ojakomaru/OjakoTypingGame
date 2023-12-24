import React from "react";
import { timeFormatting } from "../../../Hooks/scoreCalc";
import { styled } from "styled-components";
import { Box } from "@mui/material";

const StyledResultScoreWrapper = styled("div")`
  border: 2px solid #333;
  border-radius: 10px;
  width: 530px;
  height: 430px;
  background-color: #fff;
  font-size: 20px;
  left: 180px;
  top: 9px;
`;
const StyledResultTitle = styled("div")`
  padding-top: 10px;
  text-align: center;
  min-height: 74px;
  font-size: 28px;
  font-family: "mtjFontRound";
  transform: rotate(0.001deg);
`;
const StyledDetailArea = styled("div")`
  width: 220px;
  height: 33px;
  padding: 0 5px;
  margin-left: 10px;
  border-bottom: 1px solid #333;
  position: absolute;
`;

interface ResultScoreProps {
  totalType: number;
  missCount: number;
  typo: Array<string>;
  timeOfTyping: number;
}
const ResultScore = (props: ResultScoreProps) => {
  const { totalType, missCount, typo, timeOfTyping } = props;
  return (
    <StyledResultScoreWrapper>
      <StyledResultTitle>{"タイピング結果"}</StyledResultTitle>
      <StyledDetailArea>
        <Box component="span">時間</Box>
        <Box component="span">{timeFormatting(timeOfTyping)}</Box>
      </StyledDetailArea>
    </StyledResultScoreWrapper>
  );
};

export default ResultScore;
