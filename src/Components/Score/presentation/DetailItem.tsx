import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledDetailItem = styled.span<{ $align: string }>`
  text-align: ${({ $align }) => $align};
  width: 100px;
  display: inline-block;
  font-family: "mtjFontRound";
`;
interface DetailItemProps {
  children: ReactNode;
  align: string;
}
const DetailItem = (props: DetailItemProps) => {
  const { align, children } = props;
  return <StyledDetailItem $align={align}>{children}</StyledDetailItem>;
};

export default DetailItem;
