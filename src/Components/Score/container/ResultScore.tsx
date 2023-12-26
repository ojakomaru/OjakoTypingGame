import React from "react";
import { styled } from "styled-components";
import {
  Score,
  ScoreComment,
  ScoreRank,
  ResultScoreWrapper,
  WeakKeys,
} from "../presentation";
import { timeFormatting, wpmToComment, wpmToRank } from "../../../Hooks";
import { TypingDataContext } from "../../../Contexts";

const StyledDetailArea = styled.div<{ absoluteX: string; absoluteY: string }>`
  width: 220px;
  height: 33px;
  padding: 0 5px;
  margin-left: 10px;
  border-bottom: 1px solid #333;
  position: absolute;
  font-size: 20px;
  left: ${({ absoluteX }) => absoluteX};
  top: ${({ absoluteY }) => absoluteY};
`;
const StyledDetailItem = styled.span<{ align: string }>`
  text-align: ${({ align }) => align};
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
  const { typingdata } = React.useContext(TypingDataContext);
  const wpm = () => (totalType / timeOfTyping) * 60 * 1000;
  const accuracy = () => (1 - missCount / totalType) * 100;
  const score = () =>
    Math.floor(wpm() * (totalType / (totalType + missCount)) ** 3 * 10);
  const weakKeys = (): string[] => {
    const missedKeyCount: Record<string, number> = {};
    typo.forEach((key) => {
      missedKeyCount[key] = (missedKeyCount[key] || 0) + 1;
    });
    console.log(missedKeyCount);
    const sortedElements = Object.keys(missedKeyCount).sort(
      (a, b) => missedKeyCount[b] - missedKeyCount[a]
    );
    console.log(sortedElements);
    return sortedElements.slice(0, 5);
  };

  return (
    <ResultScoreWrapper>
      <StyledDetailArea absoluteX={"10px"} absoluteY={"80px"}>
        <StyledDetailItem align={"left"}>打鍵/秒</StyledDetailItem>
        <StyledDetailItem align={"right"}>{wpm().toFixed(2)}</StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"10px"} absoluteY={"110px"}>
        <StyledDetailItem align={"left"}>正打率</StyledDetailItem>
        <StyledDetailItem align={"right"}>
          {accuracy().toFixed(2)}
        </StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"10px"} absoluteY={"146px"}>
        <StyledDetailItem align={"left"}>タイム</StyledDetailItem>
        <StyledDetailItem align={"right"}>
          {timeFormatting(timeOfTyping)}
        </StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"260px"} absoluteY={"80px"}>
        <StyledDetailItem align={"left"}>問題数</StyledDetailItem>
        <StyledDetailItem align={"right"}>
          {typingdata.problems.length}
        </StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"260px"} absoluteY={"113px"}>
        <StyledDetailItem align={"left"}>打鍵数</StyledDetailItem>
        <StyledDetailItem align={"right"}>{totalType}</StyledDetailItem>
      </StyledDetailArea>
      <StyledDetailArea absoluteX={"260px"} absoluteY={"146px"}>
        <StyledDetailItem align={"left"}>ミスタイプ</StyledDetailItem>
        <StyledDetailItem align={"right"}>{missCount}</StyledDetailItem>
      </StyledDetailArea>
      <Score isBest={false} score={score()} />
      <ScoreRank label={typingdata.title} rank={wpmToRank(score())} />
      <ScoreComment comment={wpmToComment(score())} />
      <WeakKeys weakKeys={weakKeys()} />
    </ResultScoreWrapper>
  );
};

export default ResultScore;
