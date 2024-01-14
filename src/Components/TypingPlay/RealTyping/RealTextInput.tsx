import React from "react";
import { Control } from "react-hook-form";
import Input from "../../ui/Input";
import { InputValues } from "./RealTypingGame";

interface RealTextInputProps {
  control: Control<InputValues, any>;
}
const RealTextInput = ({ control }: RealTextInputProps) => {
  return (
    <Input
      name="answer"
      control={control}
      rules={{
        required: "答えを入力してください。",
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
