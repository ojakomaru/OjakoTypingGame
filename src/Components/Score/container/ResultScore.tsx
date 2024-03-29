import React from "react";
import {
  Score,
  ScoreComment,
  ScoreRank,
  WeakKeys,
  DetailArea,
  DetailItem,
} from "../presentation";
import ResultScoreLayout from "../../layout/ResultScoreLayout";
import ResultActions from "./ResultActions";
import { timeFormatting, wpmToRank, wpmToComment } from "../../../Util";

interface ResultScoreProps {
  typingTitle: string;
  problemCount: number;
  isRealPlay: boolean;
  totalType: number;
  missCount: number;
  typo: Array<string>;
  timeOfTyping: number;
  retry: () => void;
  missedRetry: () => void;
}
const ResultScore = (props: ResultScoreProps) => {
  const {
    typingTitle,
    problemCount,
    isRealPlay,
    totalType,
    missCount,
    typo,
    timeOfTyping,
    retry,
    missedRetry,
  } = props;
  const wpm = () => (totalType / timeOfTyping) * 60 * 1000;
  const wpm2 = () => wpm() / 60;
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

  const Scores = () => (
    <React.Fragment>
      <DetailArea absoluteX={"20px"} absoluteY={"80px"}>
        <DetailItem align={"left"}>打鍵/秒</DetailItem>
        <DetailItem align={"right"}>{wpm2().toFixed(1)}</DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"20px"} absoluteY={"110px"}>
        <DetailItem align={"left"}>正打率</DetailItem>
        <DetailItem align={"right"}>
          {isRealPlay ? "-" : accuracy().toFixed(2)}
        </DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"20px"} absoluteY={"146px"}>
        <DetailItem align={"left"}>タイム</DetailItem>
        <DetailItem align={"right"}>{timeFormatting(timeOfTyping)}</DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"270px"} absoluteY={"80px"}>
        <DetailItem align={"left"}>問題数</DetailItem>
        <DetailItem align={"right"}>{problemCount}</DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"270px"} absoluteY={"113px"}>
        <DetailItem align={"left"}>打鍵数</DetailItem>
        <DetailItem align={"right"}>{totalType}</DetailItem>
      </DetailArea>
      <DetailArea absoluteX={"270px"} absoluteY={"146px"}>
        <DetailItem align={"left"}>ミスタイプ</DetailItem>
        <DetailItem align={"right"}>{isRealPlay ? "-" : missCount}</DetailItem>
      </DetailArea>
      <Score isBest={false} score={score()} />
      <ScoreRank label={typingTitle} rank={wpmToRank(score())} />
      <ScoreComment comment={wpmToComment(score())} />
      <WeakKeys weakKeys={weakKeys()} />
    </React.Fragment>
  );

  return (
    <ResultScoreLayout
      resultScore={<Scores />}
      resultActions={
        <ResultActions
          isRealPlay={isRealPlay}
          retry={retry}
          missedRetry={missedRetry}
        />
      }
    />
  );
};

export default ResultScore;
