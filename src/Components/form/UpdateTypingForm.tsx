import React, { useCallback } from "react";
import { TypingDataType } from "../../@types";
import { Box, Button } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TypingDataContext } from "../../Contexts";
import saveTypingData from "./container/saveTypingData";
import {
  TitleInput,
  ProblemList,
  SubmitButton,
  ResetButton,
  DeleteButton,
} from "./presentation";
import { useCustomConfirm } from "../../Hooks/useCustomConfirm";

type UpdateTypingFormProps = {
  modData: TypingDataType;
};
const UpdateTypingForm = ({ modData }: UpdateTypingFormProps) => {
  const { typingdatas, setTypingDatas } = React.useContext(TypingDataContext);
  const {confirm, dialogElement} = useCustomConfirm()
  const navigate = useNavigate();
  const defaultValue = modData;

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
  ) => {
    saveTypingData(typingdata);
    typingdatas
      ? setTypingDatas([...typingdatas, typingdata])
      : setTypingDatas([typingdata]);
    methods.reset();
    navigate("/");
  };
  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput />
        <ProblemList />
        <Box textAlign="center" mt={2}>
          <ResetButton resetFunc={resetFunc} />
          <SubmitButton
            possible={"更新する"}
            unable={"変更はありません"}
            methods={methods}
          />
          <Button variant="outlined" onClick={() => navigate("/")}>
            キャンセル
          </Button>
        </Box>
        <DeleteButton />
      </Box>
    </FormProvider>
  );
};

export default UpdateTypingForm;
