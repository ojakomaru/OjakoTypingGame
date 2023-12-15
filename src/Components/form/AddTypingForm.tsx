import React, { useCallback } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { TypingDataType } from "../../@types";
import saveTypingData from "./container/saveTypingData";
import { TypingDataContext } from "../../Contexts";
import { TitleInput, ProblemList, SubmitButton, ResetButton } from "./presentation";

const AddTypingForm = () => {
  const { typingdatas, setTypingDatas } = React.useContext(TypingDataContext);
  const navigate = useNavigate();
  const id = uuidv4();
  const defaultValue = {
    id: id,
    title: "",
    problems: [{ text: "" }],
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
            possible={"登録する"}
            unable={"登録できません"}
            methods={methods}
          />
          <Button variant="outlined" onClick={() => navigate("/")}>
            キャンセル
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AddTypingForm;
