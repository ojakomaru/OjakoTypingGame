import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";
import { styled } from "@mui/material";
import Paragraph from "../../ui/Paragraph";
import { InputValues } from "./RealTypingGame";

const StyleQuestionText = styled(Paragraph)`
  font-size: 24px;
  line-height: 110%;
  padding: 0px 5px;
  margin-top: 0.3rem;
`;

const StyleInputText = styled(Paragraph)`
  color: #999;
  margin-top: 0.2rem;
  .typo {
    color: #f52727;
  }
`;

const StyledMissMessage = styled(Paragraph)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: "5px",
  fontSize: "0.75rem",
}));

type RealTextWatcherProps = {
  control: Control<InputValues, any>;
  questionText: string;
};
const RealTextWatcher = (props: RealTextWatcherProps) => {
  const { control, questionText } = props;
  const [missMessage, setMissMessage] = useState("");
  const questionAry: string[] = questionText.split("").slice(0);
  const inputValue = useWatch({
    control,
    name: "answer",
  })
    .split("")
    .slice(0);

  useEffect(() => {
    let message = "";
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] !== questionAry[i]) {
        if (inputValue[i] !== " ") {
          message += `${i + 1}文字目が一致しません `;
        }
      }
    }
    setMissMessage(message);
  }, [inputValue, setMissMessage]);

  return (
    <React.Fragment>
      <StyleQuestionText id="questionText">
        {questionAry.map((char: string, index: number) => (
          <span className="waiting-letters" key={index}>
            {char}
          </span>
        ))}
      </StyleQuestionText>
      <StyleInputText>
        {inputValue.map((char: string, i: number) => {
          let className =
            inputValue[i] !== questionAry[i] ? "typo" : "waiting-letters";
          return (
            <span className={className} key={i}>
              {char}
            </span>
          );
        })}
      </StyleInputText>
      <StyledMissMessage>{missMessage}</StyledMissMessage>
    </React.Fragment>
  );
};

export default RealTextWatcher;
