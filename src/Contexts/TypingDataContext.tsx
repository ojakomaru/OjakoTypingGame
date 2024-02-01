import React, { ReactNode, createContext, useState, useEffect } from "react";
import { useEffectOnce } from "../Hooks";
import { TypingDataType, TypingGameData } from "../@types";
import { db } from "../Config";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  // 登録済みのデータの取得
  const [typingdata, setTypingData] = useState<TypingDataType>(initialData);
  // const [typingdatas, setTypingDatas] = useState<TypingDataType[]>(
  //   JSON.parse(localStorage.getItem("typingData") as string)
  // );
  const [typingdatas, setTypingDatas] = useState<TypingDataType[]>([]);

  const getAllTypingDatas = async () => {
    try {
      const typingCollection = collection(db, "typingdatas");
      const querySnapshot = await getDocs(typingCollection);
      const tempJson = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      let tempAry: TypingDataType[] = [];
      for (let i = 0; i < tempJson.length; i++) {
        tempAry.push(JSON.parse(tempJson[i].typingdata));
      }
      setTypingDatas(tempAry);
      setIsLoading(false);
    } catch (e) {
      console.log("TypingDataの読み込みに失敗しました", e);
      setError(e);
    }
  };

  // メイン画面にタイピングデータを渡す
  useEffect(() => {
    getAllTypingDatas();
    // const obj = JSON.stringify(typingdatas[8]);
    // const cityRef = doc(db, "typingdatas", typingdatas[8].id);
    // setDoc(cityRef, { typingdata: obj });
    // console.log(typingdatas);
    if (typingdatas) {
      const rnd = Math.floor(Math.random() * typingdatas.length);
      setTypingData(typingdatas[rnd]);
    }
    console.log(typingdatas);
  }, [isLoading]);
  return (
    <TypingDataContext.Provider
      value={{ typingdata, setTypingData, typingdatas, setTypingDatas }}
    >
      {children}
    </TypingDataContext.Provider>
  );
};
