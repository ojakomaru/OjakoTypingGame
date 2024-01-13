import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Input from "../../ui/Input";
import { InputValues } from "./RealTypingGame";

interface RealTextInputProps {
  questionText: string;
}
const RealTextInput = (props: RealTextInputProps) => {
  const { control, setFocus } = useFormContext<InputValues>();
  // const [isFocus, setIsFocus] = useState(true);
  // useEffect(() => {
  //   if (!isFocus) {
  //     setFocus("answer");
  //   }
  // }, [isFocus]);

  return (
    <Input
      name="answer"
      control={control}
      rules={{
        required: "答えを入力してください。",
        // onBlur: (e) => console.log(e),
      }}
      textFieldProps={{
        fullWidth: true,
        autoFocus: true,
        label: "問題文を直打ちしてください",
      }}
    />
  );
};
export default RealTextInput;
