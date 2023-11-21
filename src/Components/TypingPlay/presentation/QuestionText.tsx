import React from "react";
import styled from "styled-components";
import Paragraph from "../../ui/Paragraph";

type QuestionTextProps = {
  questionText: string;
  $longModeScrollOn?: number;
};

type StyledTextProps = Omit<QuestionTextProps, "questionText">;
const StyleQuestionText = styled(Paragraph)<StyledTextProps>(
  ({ $longModeScrollOn }) => ({
    ...($longModeScrollOn != undefined
      ? {
          fontSize: "22px",
          height: "246px",
          padding: "3px 5px",
          overflowY: "scroll",
          textAlign: "left",
        }
      : {
          fontSize: "24px",
          lineHeight: "110%",
          padding: "3px 5px",
        }),
  })
);

const QuestionText = React.memo((props: QuestionTextProps) => {
  const { questionText, $longModeScrollOn } = props;
  const texts = questionText.split("\n").map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));
  return (
    <StyleQuestionText id="questionText" $longModeScrollOn={$longModeScrollOn}>
      {texts}
    </StyleQuestionText>
  );
});
export { QuestionText };
