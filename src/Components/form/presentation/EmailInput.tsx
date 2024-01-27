import React from "react";
import { useFormContext } from "react-hook-form";
import { AuthFormValues } from "../../Auth/Auth";
import Input from "../../ui/Input";

const EmailInput: React.FC = () => {
  const { control } = useFormContext<AuthFormValues>();
  return (
    <Input
      name="email"
      control={control}
      rules={{
        required: "メールアドレスは必須です",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Emailの形式ではありません",
        },
        maxLength: {
          value: 254,
          message:
            "EmailAddressが長すぎます。254文字以内のアドレスにしてください",
        },
      }}
      textFieldProps={{
        type: "email",
        label: "Email Address",
        autoComplete: "email",
        margin: "normal",
      }}
    />
  );
};

export default EmailInput;
