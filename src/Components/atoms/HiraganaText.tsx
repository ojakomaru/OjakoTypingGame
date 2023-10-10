import React, { Ref, RefObject, forwardRef, useState } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";

type HiraganaTextProps = {
  ref: RefObject<HTMLParagraphElement>;
  kanaText: string[] | undefined;
  className?: string;
};

const StyleHiraganaText = styled(Paragraph)`
  font-size: 18px;
  color: #2d0303;
  .current-letter {
    color: #2d0303;
    font-weight: bold;
  }
  .waiting-letters {
    color: #2d0303;
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
  const [correctText, setCorrectText] = useState("");
  return (
    <StyleHiraganaText ref={ref} id="hiraganaText" className={className}>
      <span className="current-letter">{correctText}</span>
      {kanaText}
    </StyleHiraganaText>
  );
}
export const HiraganaText = forwardRef<HTMLParagraphElement, HiraganaTextProps>(
  HiraganaTextCore
);
