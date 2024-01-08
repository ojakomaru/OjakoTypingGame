import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TypingDataType } from "../../../@types";
import { TypingDataContext } from "../../../Contexts";
import { TitleInput } from "../../form/presentation";

const RealTypingGame = () => {
  const { typingdatas, setTypingDatas } = React.useContext(TypingDataContext);
  const navigate = useNavigate();
  const defaultValue = {
    problem: "",
  };
  const methods = useForm<TypingDataType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: defaultValue,
  });

  const resetFunc = useCallback(() => {
    methods.reset(defaultValue);
  }, [methods, defaultValue]);

  const onSubmit: SubmitHandler<TypingDataType> = (
    typingdata: TypingDataType
  ) => {};
  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput />
      </Box>
    </FormProvider>
  );
};

export default RealTypingGame;
