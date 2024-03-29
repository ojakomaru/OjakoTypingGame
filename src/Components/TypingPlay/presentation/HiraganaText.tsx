import React, { Ref, RefObject, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import Paragraph from '../../ui/Paragraph';
import { HIDDEN, SHOW_RADIO } from '../../../@types';

type HiraganaTextProps = {
  ref: RefObject<HTMLParagraphElement>;
  kanaText: string;
  $showFurigana: SHOW_RADIO;
  className?: string;
};
type StyledTextProps = Pick<HiraganaTextProps, '$showFurigana'>;
const StyleHiraganaText = styled(Paragraph)<StyledTextProps>`
  font-size: 1rem;
  ${({ $showFurigana }) =>
    $showFurigana === HIDDEN &&
    css`
      display: none;
    `};
  .current-letter {
    color: #2d0303;
    font-weight: bold;
  }
  .typed-letters {
    color: #999;
  }
  .typo {
    color: #f52727;
  }
  &.hiraganaLongMode {
    width: 100%;
    text-align: left;
  }
`;

function HiraganaTextCore(props: HiraganaTextProps, ref: Ref<HTMLParagraphElement>) {
  const { className, kanaText, $showFurigana } = props;
  const kanaAry: string[] = kanaText.split('').slice(0);

  return (
    <StyleHiraganaText ref={ref} id="hiraganaText" className={className} $showFurigana={$showFurigana}>
      {kanaAry.map((char: string, index: number) => (
        <span className="waiting-letters" key={index}>
          {char}
        </span>
      ))}
    </StyleHiraganaText>
  );
}
export const HiraganaText = forwardRef<HTMLParagraphElement, HiraganaTextProps>(HiraganaTextCore);
