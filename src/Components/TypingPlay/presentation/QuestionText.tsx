import React from "react";
import styled from "styled-components";
import Paragraph from "../../ui/Paragraph";

type QuestionTextProps = {
  questionText: string;
  $longMode?: boolean;
};

type StyledTextProps = Omit<QuestionTextProps, "questionText">;
const StyleQuestionText = styled(Paragraph)<StyledTextProps>(
  ({ $longMode }) => ({
    ...($longMode
      ? {
          fontSize: "22px",
          width: "100%",
          padding: "3px 5px",
          overflowY: "scroll",
          textAlign: "left",
          maxHeight: "135px",
        }
      : {
          fontSize: "24px",
          lineHeight: "110%",
          padding: "3px 5px",
        }),
  })
);

const QuestionText = React.memo((props: QuestionTextProps) => {
  const { questionText, $longMode } = props;
  const texts = questionText.split("\n").map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));
  return (
    <StyleQuestionText id="questionText" $longMode={$longMode}>
      {texts}
    </StyleQuestionText>
  );
});
export { QuestionText };
