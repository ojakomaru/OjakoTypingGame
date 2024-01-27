import React from "react";
import { useFormContext } from "react-hook-form";
import { AuthFormValues } from "../../Auth/Auth";
import Input from "../../ui/Input";

type Props = {};

const PasswordInput = (props: Props) => {
  const { control } = useFormContext<AuthFormValues>();
  return (
    <Input
      name="password"
      control={control}
      rules={{
        required: "Passwordは必須です",
        minLength: { value: 6, message: "Passwordが短すぎます" },
      }}
      textFieldProps={{
        type: "password",
        label: "Password",
        autoComplete: "password",
        margin: "normal",
      }}
    />
  );
};

export default PasswordInput;
