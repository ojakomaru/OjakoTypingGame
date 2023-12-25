import React from "react";
import styled from "styled-components";

const StyledScoreComment = styled.div`
  border: 0;
  border-top: 1px solid #333;
  padding-top: 5px px;
  position: relative;
  display: block;
  left: 0px;
  top: 238px;
  margin-left: 10px;
  width: 500px;
  padding: 0 5px;
  font-size: 20px;
`;
const ScoreComment = ({ comment }: { comment: string }) => {
  return <StyledScoreComment>{comment}</StyledScoreComment>;
};

export default ScoreComment;
