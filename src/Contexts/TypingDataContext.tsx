import React, { ReactNode, createContext, useEffect, useState } from "react";
import { TypingDataType } from "../@types";
import { TypingGameData } from "../@types";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useEffectOnce } from "../Hooks";

let initialData: TypingDataType = {
  id: "1",
  title: "test",
  problems: [
    {
      text: "テスト問題",
      kana: "てすともんだい",
      romaji: "tesutomondai",
      typingWords: [
        ["te"],
        ["su"],
        ["to"],
        ["mo"],
        ["n", "xn", "nn"],
        ["da"],
        ["i", "yi"],
      ],
    },
  ],
};
export const TypingDataContext = createContext<TypingGameData>(
  {} as TypingGameData
);

export const TypingDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 登録済みのデータの取得
  // const [typingdata, setTypingData] = useLocalStorage<TypingDataType>({
  //   storageKey: "typingData",
  //   initialState: initialData,
  // });
  const [typingdata, setTypingData] = useState<TypingDataType>(initialData);
  const [typingdatas, setTypingDatas] = useState<TypingDataType[]>(
    JSON.parse(localStorage.getItem("typingData") as string)
  );
  // メイン画面にタイピングデータを渡す
  useEffectOnce(() => {
    if (typingdatas) {
      const rnd = Math.floor(Math.random() * typingdatas.length);
      setTypingData(typingdatas[rnd]);
    }
  });
  return (
    <TypingDataContext.Provider
      value={{ typingdata, setTypingData, typingdatas, setTypingDatas }}
    >
      {children}
    </TypingDataContext.Provider>
  );
};
