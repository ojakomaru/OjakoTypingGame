import React, { Ref, RefObject, forwardRef } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";

type QuestionTextProps = {
  ref: RefObject<HTMLParagraphElement>;
  className?: string;
};

const StyleQuestionText = styled(Paragraph)`
  font-size: 24px;
  color: #2d0303;
  line-height: 110%;
  padding: 3px 5px;
`;

function QuestionTextCore(
  props: QuestionTextProps,
  ref: Ref<HTMLParagraphElement>
) {
  const { className } = props;
  return (
    <StyleQuestionText ref={ref} id="questionText" className={className}>
    </StyleQuestionText>
  );
}
export const QuestionText = forwardRef<HTMLParagraphElement, QuestionTextProps>(
  QuestionTextCore
);
