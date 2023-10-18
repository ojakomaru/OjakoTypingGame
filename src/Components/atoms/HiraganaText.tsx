import React, { Ref, RefObject, forwardRef } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";

type HiraganaTextProps = {
  ref: RefObject<HTMLParagraphElement>;
  kanaText: string | undefined;
  className?: string;
};

const StyleHiraganaText = styled(Paragraph)`
  font-size: 18px;
  color: #2d0303;
  .current-letter {
    color: #2d0303;
    font-weight: bold;
  }
  .typed-letters {
    color: #999;
  }
`;

function HiraganaTextCore(
  props: HiraganaTextProps,
  ref: Ref<HTMLParagraphElement>
) {
  const { className, kanaText } = props;
  return (
    <StyleHiraganaText ref={ref} id="hiraganaText" className={className}>
      {kanaText!
        .split("")
        .slice(0)
        .map((char: string, index: number) => (
          <span className="waiting-letters" key={index}>
            {char}
          </span>
        ))}
    </StyleHiraganaText>
  );
}
export const HiraganaText = forwardRef<HTMLParagraphElement, HiraganaTextProps>(
  HiraganaTextCore
);
