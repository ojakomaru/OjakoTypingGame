import React from "react";
import styled from "styled-components";

const StyledRankArea = styled.div`
  display: block;
  font-size: 16px;
  font-family: "游ゴシック Medium", "YuGothic Medium", "游ゴシック",
    "游ゴシック体", "Meiryo";
  font-weight: bold;
  position: relative;
`;
const StyledRankBace = styled.div`
  position: absolute;
  left: 10px;
  font-weight: bold;
  margin-left: 10px;
  width: 500px;
  padding: 0 5px;
`;
const StyledRankLabel = styled(StyledRankBace)`
  top: 180px;
`;
const StyledRank = styled(StyledRankBace)`
  top: 200px;
  font-size: 24px;
  text-align: right;
`;

interface ScoreRankProps {
  label: string;
  rank: string;
}
const ScoreRank = (props: ScoreRankProps) => {
  const { label, rank } = props;
  return (
    <StyledRankArea>
      <StyledRankLabel>{`あなたの${label}のレベルは…`}</StyledRankLabel>
      <StyledRank>{`「 ${rank} 」です！`}</StyledRank>
    </StyledRankArea>
  );
};

export default ScoreRank;
