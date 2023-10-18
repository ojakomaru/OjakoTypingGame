import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TypingDataType } from "../@types";

interface TypingGameData {
  typingdata: TypingDataType;
  setTypingData: (a: TypingDataType) => void;
  typingdatas: TypingDataType[];
  setTypingDatas: (a: TypingDataType[]) => void;
}

let initialData: TypingDataType = {
  id: "1",
  title: "test",
  problems: [
    {
      text: "テスト問題",
      kana: "かな",
      romazi: "tesuto",
      furigana: "テスト",
    },
  ],
};
export const TypingDataContext = createContext<TypingGameData>( {} as TypingGameData);

export const TypingDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 登録済みのデータの取得
  const [typingdata, setTypingData] = useState<TypingDataType>(initialData);
  const [typingdatas, setTypingDatas] = useState<TypingDataType[]>(
    JSON.parse(localStorage.getItem("typingData") as string)
  );
  // メイン画面にタイピングデータを渡す
  useEffect(() => {
    if (typingdatas) {
      const rnd = Math.floor(Math.random() * typingdatas.length);
      setTypingData(typingdatas[rnd]);
    }
  }, []);
  return (
    <TypingDataContext.Provider
      value={{ typingdata, setTypingData, typingdatas, setTypingDatas }}
    >
      {children}
    </TypingDataContext.Provider>
  );
};
