import React, { useEffect } from "react";
import { TypingDataType } from "../../@types";
import { Box, Button } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TypingDataContext } from "../../Contexts";
import saveTypingData from "./container/saveTypingData";
import ProblemList from "./presentation/ProblemList";
import TitleInput from "./presentation/TitleInput";

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

  const onSubmit: SubmitHandler<TypingDataType> = (
    typingdata: TypingDataType
  ) => {
    saveTypingData(typingdata);
    // console.log(typingdata);
    // typingdatas
    //   ? setTypingDatas([...typingdatas, typingdata])
    //   : setTypingDatas([typingdata]);
    // methods.reset();
    // navigate("/");
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
            ホームに戻る
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default UpdateTypingForm;
