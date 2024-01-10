import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TypingDataType } from "../../../@types";
import { TypingDataContext } from "../../../Contexts";
import { TitleInput } from "../../form/presentation";
import MainDisplayLayout from "../../layout/MainDisplayLayout";
import { MainDisplay } from "../../MainDisplay/container/MainDisplay";
import RealTypingDisplay from "../../MainDisplay/container/RealTypingDisplay";

interface RealTypingGameProps {
  isPlaying: boolean;
  setIsPlaying: (a: boolean) => void;
}
const RealTypingGame = (props: RealTypingGameProps) => {
  const { isPlaying, setIsPlaying } = props;
  const { typingdata } = React.useContext(TypingDataContext);
  const navigate = useNavigate();
  const defaultValue = {
    problem: "",
  };
  const methods = useForm<typeof defaultValue>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: defaultValue,
  });

  const resetFunc = useCallback(() => {
    methods.reset(defaultValue);
  }, [methods, defaultValue]);

  const onSubmit: SubmitHandler<typeof defaultValue> = (
    inputData: typeof defaultValue
  ) => {};
  return (
    <FormProvider {...methods}>
      <RealTypingDisplay
        typingdata={typingdata}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput />
      </Box>
    </FormProvider>
  );
};

export default RealTypingGame;
