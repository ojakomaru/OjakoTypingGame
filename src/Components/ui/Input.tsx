import React from "react";

import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface MuiProps {
  textFieldProps?: TextFieldProps;
}
const Input = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  textFieldProps,
  ...props
}: MuiProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <TextField
      {...textFieldProps}
      {...field}
      error={!!error}
      helperText={!!error && error.message}
    />
  );
};

export default Input;
