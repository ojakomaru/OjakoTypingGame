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
        label :"タイピングタイトル",
      }}
    />

    // <>
    //   {/*Controllerコンポーネントで TextFieldをReactHookFormと紐づける*/}
    //   <Controller
    //     name="title"
    //     control={control}
    //     rules={{
    //       required: "名前を入力してください。",
    //       minLength: { value: 2, message: "2文字以上で入力してください。" },
    //     }}
    //     render={({ field, fieldState }) => (
    //       <TextField
    //         {...field}
    //         type="text"
    //         label="タイピングタイトル"
    //         error={fieldState.invalid}
    //         helperText={fieldState.error?.message}
    //       />
    //     )}
    //   />
    // </>
  );
};
export default TitleInput;
