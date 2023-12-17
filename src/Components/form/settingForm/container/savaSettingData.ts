import React from "react";
import { SettingTypes } from "../../../../@types";
import { SettingDataContext } from "../../../../Contexts";

const saveSettingData = (data: SettingTypes): void => {
  const {
    setTypeMode,
    setShowFurigana,
    setRomajiType,
    setOrder,
    setShowKeyboard,
  } = React.useContext(SettingDataContext);
  setTypeMode(data.typeMode);
  setShowFurigana(data.showFurigana);
  setRomajiType(data.romajiType);
  setOrder(data.order);
  setShowKeyboard(data.showKeyboard);
};
export default saveSettingData;
