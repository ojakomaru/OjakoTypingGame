import React, { useCallback } from "react";
import { TypingDataType } from "../../@types";
import { Box } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TypingDataContext } from "../../Contexts";
import saveTypingData from "./container/saveTypingData";
import {
  TitleInput,
  ProblemList,
  CancelButton,
  SubmitButton,
  ResetButton,
  DeleteButton,
} from "./presentation";

type UpdateTypingFormProps = {
  modData: TypingDataType;
};
const UpdateTypingForm = ({ modData }: UpdateTypingFormProps) => {
  const { typingdatas, setTypingDatas } = React.useContext(TypingDataContext);
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
    typingdatas.splice(
      typingdatas.findIndex((data: TypingDataType) => data.id === modData.id),
      1
    );
    setTypingDatas([...typingdatas, typingdata]);
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
          <CancelButton isDirty={methods.formState.isDirty} />
        </Box>
        <DeleteButton deleteID={modData.id} />
      </Box>
    </FormProvider>
  );
};

export default UpdateTypingForm;
