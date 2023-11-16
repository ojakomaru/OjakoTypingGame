import React from "react";
import styled from "styled-components";
import Paragraph from "../../ui/Paragraph";
import { Divider } from "@mui/material";

type QuestionTextProps = {
  questionText: string;
  longTextMode?: boolean;
  scrollOn?: number;
};

type StyledTextProps = Omit<QuestionTextProps, "questionText">;
const StyleQuestionText = styled(Paragraph)<StyledTextProps>(
  ({ longTextMode, scrollOn }) => ({
    ...(longTextMode
      ? {
          fontSize: "12px",
          color: "red",
          lineHeight: "110%",
          padding: "3px 5px",
        }
      : {
          fontSize: "24px",
          color: "#2d0303",
          lineHeight: "110%",
          padding: "3px 5px",
        }),
  })
);

const QuestionText = React.memo((props: QuestionTextProps) => {
  const { questionText, longTextMode, scrollOn } = props;
  const texts = questionText.split("\n").map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));
  return (
    <StyleQuestionText id="questionText" longTextMode scrollOn={scrollOn}>
      {longTextMode ?? <div>"TEST"</div>}
      {texts}
    </StyleQuestionText>
  );
});
export { QuestionText };
