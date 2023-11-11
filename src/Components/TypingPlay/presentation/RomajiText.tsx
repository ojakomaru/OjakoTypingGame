import React, { Ref, RefObject, forwardRef } from "react";
import styled from "styled-components";
import Paragraph from "../../ui/Paragraph";
import { RomajiTyping } from "../container/RomajiTyping";

type RomajiTextProps = {
  romaji: string;
  ref: RefObject<HTMLParagraphElement>;
  className?: string;
};

const StyleRomajiText = styled(Paragraph)`
  font-size: 18px;
  color: #2d0303;
  .current-letter {
    color: #2d0303;
    text-decoration: underline;
    font-weight: bold;
    animation: blink 1s linear infinite;
  }
  @keyframes blink {
    100% {
      text-decoration: none;
    }
  }
  .waiting-letters {
    color: #2d0303;
  }
  .typed-letters {
    color: #999;
  }
  .typo {
    color: #f52727;
  }
`;

function RomajiTextCore(
  props: RomajiTextProps,
  ref: Ref<HTMLParagraphElement>
) {
  const { romaji, className } = props;
  return (
    <StyleRomajiText ref={ref} id="checkText" className={className}>
      <RomajiTyping romaji={romaji} />
    </StyleRomajiText>
  );
}
export const RomajiText = forwardRef<HTMLParagraphElement, RomajiTextProps>(
  RomajiTextCore
);
