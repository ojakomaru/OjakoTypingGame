import React from "react";
import {
  Score,
  ScoreComment,
  ScoreRank,
  ResultScoreWrapper,
  WeakKeys,
  DetailArea,
  DetailItem,
} from "../presentation";
import { timeFormatting, wpmToComment, wpmToRank } from "../../../Hooks";
import { TypingDataContext } from "../../../Contexts";

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
    const sortedElements = Object.keys(missedKeyCount).sort(
      (a, b) => missedKeyCount[b] - missedKeyCount[a]
    );
    return sortedElements.slice(0, 5);
  };

  return (
    <ResultScoreWrapper>
      <DetailArea absoluteX={"10px"} absoluteY={"80px"}>
        <DetailItem align={"left"}>打鍵/秒</DetailItem>
        <DetailItem align={"right"}>{wpm().toFixed(2)}</DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"10px"} absoluteY={"110px"}>
        <DetailItem align={"left"}>正打率</DetailItem>
        <DetailItem align={"right"}>
          {accuracy().toFixed(2)}
        </DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"10px"} absoluteY={"146px"}>
        <DetailItem align={"left"}>タイム</DetailItem>
        <DetailItem align={"right"}>
          {timeFormatting(timeOfTyping)}
        </DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"260px"} absoluteY={"80px"}>
        <DetailItem align={"left"}>問題数</DetailItem>
        <DetailItem align={"right"}>
          {typingdata.problems.length}
        </DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"260px"} absoluteY={"113px"}>
        <DetailItem align={"left"}>打鍵数</DetailItem>
        <DetailItem align={"right"}>{totalType}</DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"260px"} absoluteY={"146px"}>
        <DetailItem align={"left"}>ミスタイプ</DetailItem>
        <DetailItem align={"right"}>{missCount}</DetailItem>
      </DetailArea>
      <Score isBest={false} score={score()} />
      <ScoreRank label={typingdata.title} rank={wpmToRank(score())} />
      <ScoreComment comment={wpmToComment(score())} />
      <WeakKeys weakKeys={weakKeys()} />
    </ResultScoreWrapper>
  );
};

export default ResultScore;
