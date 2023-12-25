import React from "react";
import { timeFormatting } from "../../../Hooks/scoreCalc";
import { styled } from "styled-components";
import {
  Score,
  ScoreComment,
  ScoreRank,
  ResultScoreWrapper,
} from "../presentation";

const StyledDetailArea = styled.div<{ absoluteX: string; absoluteY: string }>`
  width: 220px;
  height: 33px;
  padding: 0 5px;
  margin-left: 10px;
  border-bottom: 1px solid #333;
  position: absolute;
  left: ${({ absoluteX }) => absoluteX};
  top: ${({ absoluteY }) => absoluteY};
`;
const StyledDetailItem = styled.span<{ dataTitle: string }>`
  text-align: ${({ dataTitle }) => (dataTitle === "dd" ? "right" : "left")};
  font-size: 20px;
  width: 100px;
  display: inline-block;
  font-family: "mtjFontRound";
`;

interface ResultScoreProps {
  totalType: number;
  missCount: number;
  typo: Array<string>;
  timeOfTyping: number;
}
const ResultScore = (props: ResultScoreProps) => {
  const { totalType, missCount, typo, timeOfTyping } = props;
  const accuracy = () => {
    return ((1 - missCount / totalType) * 100).toFixed(1);
  };
  return (
    <ResultScoreWrapper>
      <StyledDetailArea absoluteX={"10px"} absoluteY={"80px"}>
        <StyledDetailItem dataTitle={"dt"}>打鍵/秒</StyledDetailItem>
        <StyledDetailItem dataTitle={"dd"}>2.3</StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"10px"} absoluteY={"110px"}>
        <StyledDetailItem dataTitle={"dt"}>正打率</StyledDetailItem>
        <StyledDetailItem dataTitle={"dd"}>{accuracy()}</StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"10px"} absoluteY={"146px"}>
        <StyledDetailItem dataTitle={"dt"}>タイム</StyledDetailItem>
        <StyledDetailItem dataTitle={"dd"}>
          {timeFormatting(timeOfTyping)}
        </StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"260px"} absoluteY={"80px"}>
        <StyledDetailItem dataTitle={"dt"}>問題数</StyledDetailItem>
        <StyledDetailItem dataTitle={"dd"}>20</StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"260px"} absoluteY={"113px"}>
        <StyledDetailItem dataTitle={"dt"}>打鍵数</StyledDetailItem>
        <StyledDetailItem dataTitle={"dd"}>{totalType}</StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"260px"} absoluteY={"146px"}>
        <StyledDetailItem dataTitle={"dt"}>ミスタイプ</StyledDetailItem>
        <StyledDetailItem dataTitle={"dd"}>{missCount}</StyledDetailItem>
      </StyledDetailArea>
      <Score isBest={false} score={2000} />
      <ScoreRank label={"問題文"} rank="SS" />
      <ScoreComment comment={"よくできました"} />
    </ResultScoreWrapper>
  );
};

export default ResultScore;
