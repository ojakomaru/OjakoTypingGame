import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { SettingTypes } from "../../../@types";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  RomajiTypeValues,
  TypeModeValues,
  ShowRadioFLG,
  OrderValues,
  defaultSetting,
} from "../../../Config";
import { RadioForm } from "./presentation";
import saveSettingData from "./container/savaSettingData";
import { SettingDataContext } from "../../../Contexts";

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
  const {
    typeMode,
    setTypeMode,
    showFurigana,
    setShowFurigana,
    romajiType,
    setrRomajiType,
    order,
    setOrder,
    showKeyboard,
    setShowKeyboard,
  } = React.useContext(SettingDataContext);
  const methods = useForm<SettingTypes>({
    defaultValues: defaultSetting as SettingTypes,
  });

  const onSubmit: SubmitHandler<SettingTypes> = (data) => {
    saveSettingData(data);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <RadioForm
          label="入力モード"
          radioGroupProps={{
            name: "typeMode",
            defaultValue: typeMode,
            row: true,
          }}
          options={TypeModeValues}
          setFunc={setTypeMode}
        />
        <RadioForm
          label="ひらがな表示"
          radioGroupProps={{
            name: "showFurigana",
            defaultValue: showFurigana,
            row: true,
          }}
          options={ShowRadioFLG}
          setFunc={setShowFurigana}
        />
        <RadioForm
          label="ローマ字設定"
          radioGroupProps={{
            name: "romajiType",
            defaultValue: romajiType,
            row: true,
          }}
          options={RomajiTypeValues}
          setFunc={setrRomajiType}
        />
        <RadioForm
          label="出題順"
          radioGroupProps={{
            name: "order",
            defaultValue: order,
            row: true,
          }}
          options={OrderValues}
          setFunc={setOrder}
        />
        <RadioForm
          label="キーボード表示"
          radioGroupProps={{
            name: "showKeyboard",
            defaultValue: showKeyboard,
            row: true,
          }}
          options={ShowRadioFLG}
          setFunc={setShowKeyboard}
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
    </FormProvider>
  );
}

export default SettingForm;
