import React from "react";
import { useFormContext } from "react-hook-form";
import { type TypingDataType } from "../../../@types";
import Input from "../../ui/Input";

const TitleInput: React.FC = () => {
  const { control } = useFormContext<TypingDataType>();
  return (
    <Input
      name="title"
      control={control}
      rules={{
        required: "名前を入力してください。",
        minLength: { value: 2, message: "2文字以上で入力してください。" },
      }}
      textFieldProps={{
        label: "タイピングタイトル",
        sx: { width: "100%" },
      }}
    />
  );
};
export default TitleInput;
