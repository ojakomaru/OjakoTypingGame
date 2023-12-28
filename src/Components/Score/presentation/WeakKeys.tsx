import React from "react";
import styled from "styled-components";

const StyledWeakKeys = styled.div`
  border-top: 1px solid #333;
  width: 95%;
  position: relative;
  left: 10px;
  top: 238px;
  margin: 10px 0 0 10px;
  padding: 0 5px;
  font-size: 16px;
`;
const WeakKeys = ({ weakKeys }: { weakKeys: string[] }) => {
  let comment = "";
  const weakPoint = weakKeys.length;
  if (weakPoint === 0) {
    comment = "エレガント！！あなた正確無比なタイピングに弱点はありません！";
  } else {
    comment = `苦手キーの「${weakKeys
      .join(" ")
      .toUpperCase()}」を意識しましょう`;
  }
  return <StyledWeakKeys>{comment}</StyledWeakKeys>;
};

export default WeakKeys;
