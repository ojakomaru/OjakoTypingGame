import { Box, Button } from "@mui/material";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { TypingDataType } from "../../@types";
import saveTypingData from "./container/saveTypingData";
import ProblemList from "./presentation/ProblemList";
import TitleInput from "./presentation/TitleInput";
import { TypingDataContext } from "../../Contexts";

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
          <Button
            variant="outlined"
            onClick={() => {
              methods.reset(defaultValue);
            }}
          >
            リセット
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ mx: 1 }}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
          >
            {methods.formState.isValid ? "登録する" : "登録できません"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            キャンセル
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AddTypingForm;
