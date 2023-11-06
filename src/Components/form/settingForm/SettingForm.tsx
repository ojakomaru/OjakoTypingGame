import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { SettingTypes, SHORT_TEXT, SHOW, UPPER } from "../../../@types";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  RomajiTypeValues,
  TypeModeValues,
  ShowRadioFLG,
  defaultSetting,
} from "../../../Config";
import { FormWrapper, RadioForm } from "./presentation";
import saveSettingData from "./container/savaSettingData";


interface SettingFormProps {
  setIsSetting?: (a: boolean) => void;
}

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
    saveSettingData(data);
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
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
              name: "showFurigana",
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
        </Box>
      </FormWrapper>
    </FormProvider>
  );
}

export default SettingForm;
