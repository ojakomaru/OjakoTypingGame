import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { type TypingDataType } from "../../@types";
import { Stack, Button, Box } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import saveTypingData from "../../functional/saveTypingData";
import TitleInput from "../atoms/TitleInput";
import ProblemList from "../organisms/ProblemList";
import { TypingDataContext } from "../../Contexts/TypingDataContext";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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

const AddTyping: React.FC = () => {
  const { typingdatas, setTypingDatas } = React.useContext(TypingDataContext);
  const navigate = useNavigate();
  const id = uuidv4();
  const methods = useForm<TypingDataType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    // 2. useFormで必要な関数を取得し、デフォルト値を指定します。
    defaultValues: {
      id: id,
      title: "",
      problems: [{ text: "" }],
    },
  });

  // 4. サブミット時の処理を作成します。
  // 検証が成功すると呼び出され、引数で入力値が渡ってきます。
  const onSubmit: SubmitHandler<TypingDataType> = (
    typingdata: TypingDataType
  ) => {
    saveTypingData(typingdata);
    setTypingDatas([...typingdatas, typingdata]);
    methods.reset();
    navigate("/");
  };

  // 5. form要素のonSubmitに1.で取得しているhandleSubmitを指定します */
  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        css={FormLayout}
      >
        <TitleInput />
        <ProblemList />
        <Box textAlign="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              methods.reset({
                id: id,
                title: "",
                problems: [{ text: "" }],
              });
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
      </Stack>
    </FormProvider>
  );
};

export default AddTyping;
