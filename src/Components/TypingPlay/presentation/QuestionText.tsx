import React, { Ref, RefObject, forwardRef } from "react";
import styled from "styled-components";
import Paragraph from "../../ui/Paragraph";

type QuestionTextProps = {
  questionText: string;
};

const StyleQuestionText = styled(Paragraph)`
  font-size: 24px;
  color: #2d0303;
  line-height: 110%;
  padding: 3px 5px;
`;

export function QuestionText(props: QuestionTextProps) {
  const { questionText } = props;
  return (
    <StyleQuestionText id="questionText" >
      {questionText}
    </StyleQuestionText>
  );
}
// export const questionText = forwardRef<HTMLParagraphElement, QuestionTextProps>(
//   QuestionTextCore
// );
