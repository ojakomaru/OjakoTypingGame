import React, { ReactNode, createContext, useState, useEffect } from "react";
import { useEffectOnce } from "../Hooks";
import { TypingDataType, TypingGameData } from "../@types";
import { db } from "../Config";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

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
  const [typing_datas, setTyping_Datas] = useState<TypingDataType[]>([]);
  const getAllTypingDatas = async () => {
    const typingCollection = collection(db, "typingdatas");
    const querySnapshot = await getDocs(typingCollection);
    const tempJson = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    let tempAry: TypingDataType[] = [];
    for (let i = 0; i < tempJson.length; i++) {
       tempAry.push(JSON.parse(tempJson[i].typingdata));
    }
    setTyping_Datas(tempAry);
    // console.log(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
  };

  // メイン画面にタイピングデータを渡す
  useEffectOnce(() => {
    getAllTypingDatas();
    // const obj = JSON.stringify(typingdatas[8]);
    // const cityRef = doc(db, "typingdatas", typingdatas[8].id);
    // setDoc(cityRef, { typingdata: obj });
    if (typingdatas) {
      const rnd = Math.floor(Math.random() * typingdatas.length);
      setTypingData(typingdatas[rnd]);
    }
  });
  // console.log(typing_datas);
  return (
    <TypingDataContext.Provider
      value={{ typingdata, setTypingData, typingdatas, setTypingDatas }}
    >
      {children}
    </TypingDataContext.Provider>
  );
};
