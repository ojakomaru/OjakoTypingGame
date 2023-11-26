import React, { Ref, RefObject, forwardRef } from "react";
import styled from "styled-components";
import Paragraph from "../../ui/Paragraph";
import { Romanizer } from "../../../Hooks";

type HiraganaTextProps = {
  ref: RefObject<HTMLParagraphElement>;
  kanaText: string;
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
  const romanizer = new Romanizer();
  const kanaAry = kanaText
    .split("")
    .slice(0)
    .map((val, i, array) => {
      let char = val + array[i + 1];
      if (romanizer.isWithSutegana(val, 0)) {
        return char;
      } else {
        return val;
      }
    });

  return (
    <StyleHiraganaText ref={ref} id="hiraganaText" className={className}>
      {kanaAry.map((char: string, index: number) => (
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
