import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledDetailArea = styled.div<{ $absoluteX: string; $absoluteY: string }>`
  width: 220px;
  height: 33px;
  padding: 0 5px;
  margin-left: 10px;
  border-bottom: 1px solid #333;
  position: absolute;
  font-size: 20px;
  left: ${({ $absoluteX }) => $absoluteX};
  top: ${({ $absoluteY }) => $absoluteY};
`;
interface DetailAreaProps {
  children: ReactNode;
  absoluteX: string;
  absoluteY: string;
}
const DetailArea = (props: DetailAreaProps) => {
  const { children, absoluteX, absoluteY } = props;
  return (
    <StyledDetailArea $absoluteX={absoluteX} $absoluteY={absoluteY}>
      {children}
    </StyledDetailArea>
  );
};

export default DetailArea;
