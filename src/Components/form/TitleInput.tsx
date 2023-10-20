import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { type TypingDataType } from "../../@types";
import { TextField } from "@mui/material";

const TitleInput: React.FC = () => {
  const { control } = useFormContext<TypingDataType>();
  return (
    <>
      {/* 6.Controllerコンポーネントで TextFieldをReactHookFormと紐づけます。*/}
      <Controller
        name="title"
        control={control}
        rules={{
          required: "名前を入力してください。",
          minLength: { value: 2, message: "2文字以上で入力してください。" },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="text"
            label="タイピングタイトル"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </>
  );
};
export default TitleInput;
