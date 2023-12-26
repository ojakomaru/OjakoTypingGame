import React from "react";
import styled from "styled-components";

const StyledWeakKeys = styled.div`
  border-top: 1px solid #333;
  position: relative;
  left: 0px;
  top: 238px;
  margin: 10px 0 0 10px;
  padding: 0 5px;
  font-size: 16px;
`;
const WeakKeys = ({ weakKeys }: { weakKeys: string[] }) => {
  return <StyledWeakKeys>WeakKeys</StyledWeakKeys>;
};

export default WeakKeys;
