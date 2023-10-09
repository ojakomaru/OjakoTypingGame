import React, { Ref, RefObject, forwardRef } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";

type HiraganaTextProps = {
  ref: RefObject<HTMLParagraphElement>;
  className?: string;
};

const StyleHiraganaText = styled(Paragraph)`
  font-size: 18px;
  color: #2d0303;
  .current-letter {
    color: #2d0303;
    text-decoration: underline;
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

function HiraganaTextCore(
  props: HiraganaTextProps,
  ref: Ref<HTMLParagraphElement>
) {
  const { className } = props;
  return (
    <StyleHiraganaText ref={ref} id="hiraganaText" className={className}>
      {/* <span className="current-letter">{romaji![0]}</span>
      {romaji!
        .split("")
        .slice(1)
        .map((char: string, index: number) => (
          <span className="waiting-letters" key={index}>
            {char}
          </span>
        ))} */}
    </StyleHiraganaText>
  );
}
export const HiraganaText = forwardRef<HTMLParagraphElement, HiraganaTextProps>(
  HiraganaTextCore
);
