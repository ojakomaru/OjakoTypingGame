import React, { ReactNode, createContext, useState } from 'react'
import { defaultSetting } from '../Config'
import { ROMAJI_TYPE, SHOW_RADIO, SettingTypes, TYPE_MODE } from '../@types'

type ContextProps = {
  setTypeMode: React.Dispatch<React.SetStateAction<TYPE_MODE>>;
  setShowFurigana: React.Dispatch<React.SetStateAction<SHOW_RADIO>>;
  setrRomajiType: React.Dispatch<React.SetStateAction<ROMAJI_TYPE>>;
  setShowKeyboard: React.Dispatch<React.SetStateAction<SHOW_RADIO>>;
} & SettingTypes;
export const SettingDataContext = createContext<ContextProps>({} as ContextProps);
export const SettingDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  let settingData = defaultSetting;
  if(localStorage.hasOwnProperty("settingData")) {
    settingData = JSON.parse(
      localStorage.getItem("settingData") as string
    );
  }
  const [typeMode, setTypeMode] = useState<TYPE_MODE>(
    settingData.typeMode as TYPE_MODE
  );
  const [showFurigana, setShowFurigana] = useState<SHOW_RADIO>(
    settingData.showFurigana as SHOW_RADIO
  );
  const [romajiType, setrRomajiType] = useState<ROMAJI_TYPE>(
    settingData.romajiType as ROMAJI_TYPE
  );
  const [showKeyboard, setShowKeyboard] = useState<SHOW_RADIO>(
    settingData.showKeyboard as SHOW_RADIO
  );

  return (
    <SettingDataContext.Provider
      value={{
        typeMode,
        setTypeMode,
        showFurigana,
        setShowFurigana,
        romajiType,
        setrRomajiType,
        showKeyboard,
        setShowKeyboard,
      }}
    >
      {children}
    </SettingDataContext.Provider>
  );
};

