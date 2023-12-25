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
const StyledRankLabel = styled.div`
  position: absolute;
  left: 0px;
  top: 258px;
  font-weight: bold;
  margin-left: 10px;
  width: 500px;
  padding: 0 5px;
`;
const StyledRank = styled.div`
  position: absolute;
  left: 0px;
  top: 280px;
  font-size: 24px;
  text-align: right;
  font-weight: bold;
  margin-left: 10px;
  width: 500px;
  padding: 0 5px;
`;

interface ScoreRankProps {
  label: string;
  rank: string;
}
const ScoreRank = (props: ScoreRankProps) => {
  const { label, rank } = props;
  return (
    <StyledRankArea>
      <StyledRankLabel>{label}</StyledRankLabel>
      <StyledRank>{`「 ${rank} 」です！`}</StyledRank>
    </StyledRankArea>
  );
};

export default ScoreRank;
