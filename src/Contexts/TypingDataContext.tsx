import React, { ReactNode, createContext, useState } from "react";
import { useEffectOnce } from "../Hooks";
import { TypingDataType, TypingGameData } from "../@types";
import { db } from "../Config";
import { doc, setDoc } from "firebase/firestore";

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
  const [typingdata, setTypingData] = useState<TypingDataType>(initialData);
  const [typingdatas, setTypingDatas] = useState<TypingDataType[]>(
    JSON.parse(localStorage.getItem("typingData") as string)
  );
  // メイン画面にタイピングデータを渡す
  useEffectOnce(() => {
    const obj = JSON.stringify({
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
        {
          text: "田中健太",
          romaji: "tanakakenta",
          kana: "タナカケンタ",
          typingword: [["ta"], ["na"], ["ka", "ca"]],
        },
      ],
    });
    const cityRef = doc(db, "typingdatas", "ojakoAddDataTest");
    setDoc(cityRef, { typingdata: obj });
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
