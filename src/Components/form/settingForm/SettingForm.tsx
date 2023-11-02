import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { SettingTypes, SHORT_TEXT, SHOW, UPPER } from "../../../@types";
import { Stack, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  RomajiTypeValues,
  TypeModeValues,
  ShowRadioFLG,
} from "../../../Config";
import { RadioForm } from "../../ui/RadioForm";

interface SettingFormProps {
  setIsSetting?: (a: boolean) => void;
}

const defaultSetting = {
  typeMode: SHORT_TEXT, // 短文
  showFurigana: SHOW, // ふりがなを表示
  romajiType: UPPER, // 大文字になる
  showKeyboard: SHOW, // キーボードを表示
};

function SettingForm(props: SettingFormProps) {
  props.setIsSetting!(true);
  const navigate = useNavigate();
  const backToHome = () => {
    props.setIsSetting!(false);
    navigate("/");
  };
  const methods = useForm<SettingTypes>({
    defaultValues: defaultSetting as SettingTypes,
  });

  const onSubmit: SubmitHandler<SettingTypes> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Stack component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <RadioForm
          label="入力モード"
          radioGroupProps={{
            name: "typeMode",
            defaultValue: SHORT_TEXT,
            row: true,
          }}
          options={TypeModeValues}
        />
        <RadioForm
          label="ひらがな表示"
          radioGroupProps={{
            name: "showHiragana",
            defaultValue: SHOW,
            row: true,
          }}
          options={ShowRadioFLG}
        />
        <RadioForm
          label="ローマ字設定"
          radioGroupProps={{
            name: "romajiType",
            defaultValue: UPPER,
            row: true,
          }}
          options={RomajiTypeValues}
        />
        <RadioForm
          label="キーボード表示"
          radioGroupProps={{
            name: "showKeyboard",
            defaultValue: SHOW,
            row: true,
          }}
          options={ShowRadioFLG}
        />
        <Box textAlign="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              methods.reset(defaultSetting as SettingTypes);
            }}
          >
            リセット
          </Button>
          <Button variant="contained" type="submit" sx={{ mx: 1 }}>
            設定する
          </Button>
          <Button variant="outlined" onClick={backToHome}>
            ホームに戻る
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default SettingForm;
