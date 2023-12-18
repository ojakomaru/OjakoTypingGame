import React from "react";
import {
  ORDER_TYPE,
  ROMAJI_TYPE,
  SHOW_RADIO,
  TYPE_MODE,
} from "../../@types";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  RomajiTypeValues,
  TypeModeValues,
  ShowRadioFLG,
  OrderValues,
  defaultSetting,
} from "../../Config";
import { RadioForm } from "./settingForm/presentation";
import { SettingDataContext } from "../../Contexts";
import { ResetButton } from "./presentation";

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
    setRomajiType,
    order,
    setOrder,
    showKeyboard,
    setShowKeyboard,
  } = React.useContext(SettingDataContext);

  const resetFunc = () => {
    setTypeMode(defaultSetting.typeMode as TYPE_MODE);
    setShowFurigana(defaultSetting.showFurigana as SHOW_RADIO);
    setRomajiType(defaultSetting.romajiType as ROMAJI_TYPE);
    setOrder(defaultSetting.order as ORDER_TYPE);
    setShowKeyboard(defaultSetting.showKeyboard as SHOW_RADIO);
  };
  return (
    <Box component="form">
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
        setFunc={setRomajiType}
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
        <ResetButton resetFunc={resetFunc} />
        <Button variant="outlined" sx={{ mx: 1 }} onClick={backToHome}>
          ホームに戻る
        </Button>
      </Box>
    </Box>
  );
}

export default SettingForm;
