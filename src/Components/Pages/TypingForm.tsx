import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { type TypingDataType } from "../../@types";
import { Stack, Button, Box } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import saveTypingData from "../form/container/saveTypingData";
import TitleInput from "../form/presentation/TitleInput";
import ProblemList from "../form/presentation/ProblemList";
import { TypingDataContext } from "../../Contexts";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormWrapper } from "../form/settingForm/presentation";
import Layout from "../layout/Layout";

const FormLayout = css`
  min-height: 45vh;
  min-width: 65ch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem auto;
  > div {
    width: 55%;
  }
`;

const TypingForm: React.FC = () => {
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
    setTypingDatas([...typingdatas, typingdata]);
    methods.reset();
    navigate("/");
  };

  return (
    <Layout>
      <FormWrapper>
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
                disabled={
                  !methods.formState.isDirty || !methods.formState.isValid
                }
              >
                {methods.formState.isValid ? "登録する" : "登録できません"}
              </Button>
              <Button variant="outlined" onClick={() => navigate("/")}>
                ホームに戻る
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </FormWrapper>
    </Layout>
  );
};

export default TypingForm;
