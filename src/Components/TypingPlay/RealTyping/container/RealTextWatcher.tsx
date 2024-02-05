import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";
import { StyleQuestionText, StyleInputText, StyledMissMessage } from "../presentation";
import { InputValues } from "./RealTypingGame";

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
          const className =
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
