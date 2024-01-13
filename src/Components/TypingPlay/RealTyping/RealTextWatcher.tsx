import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Control, UseFormSetFocus } from "react-hook-form/dist/types";
import { InputValues } from "./RealTypingGame";

type RealTextWatcherProps = {
  control: Control<InputValues, any>;
};
const RealTextWatcher = (props: RealTextWatcherProps) => {
  const { control } = useFormContext<InputValues>();
  const inputValue = useWatch({
    control,
    name: "answer",
    defaultValue: "Enterで次の問題へ",
  });

  return <div>{inputValue}</div>;
};

export default RealTextWatcher;
