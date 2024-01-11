import React, { Ref, forwardRef } from "react";
import styled, { css } from "styled-components";
import Paragraph from "../../ui/Paragraph";

type RomajiTextProps = {
  romaji: string;
  $isRealMode?: boolean;
  className?: string;
};
type StyledTextProps = Pick<RomajiTextProps, "$isRealMode">;
const StyleRomajiText = styled(Paragraph)<StyledTextProps>`
  width: 100%;
  font-size: 18px;
  letter-spacing: 1.4px;
  overflow-wrap: break-word;
  margin-top: 0.3rem;
  &.romajiLongMode {
    text-align: left;
  }
  .current-letter {
    font-size: 19px;
    ${({ $isRealMode }) =>
      $isRealMode &&
      css`
        font-weight: bold;
        text-decoration: underline;
        text-decoration-skip-ink: none;
        animation: blink 1s linear infinite;
      `}
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
  const { romaji, $isRealMode, className } = props;
  return (
    <StyleRomajiText
      ref={ref}
      id="checkText"
      className={className}
      $isRealMode={$isRealMode}
    >
      <span className="current-letter">{romaji[0]}</span>
      {romaji
        .split("")
        .slice(1)
        .map((char: string, index: number) => (
          <span className="waiting-letters" key={index}>
            {char}
          </span>
        ))}
    </StyleRomajiText>
  );
}
export const RomajiText = forwardRef<HTMLParagraphElement, RomajiTextProps>(
  RomajiTextCore
);
