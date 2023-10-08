import React, { FC, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Play from "./Components/Pages/Play";
import AddTyping from "./Components/Pages/AddTyping";
import { type TypingDataType } from "./@types/ModuleTypes";

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

const App: FC = () => {
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
    <Routes>
      {/*RouteにHomeを設定する*/}
      <Route
        path="/"
        element={
          <Home
            typingdata={typingdata}
            setTypingData={setTypingData}
            typingdatas={typingdatas}
            setTypingDatas={setTypingDatas}
          />
        }
      />
      <Route
        path="/play"
        element={
          <Play
            typingdata={typingdata}
            setTypingData={setTypingData}
            typingdatas={typingdatas}
            setTypingDatas={setTypingDatas}
          />
        }
      />
      <Route path="/addtyping" element={<AddTyping />} />
      {/* <Route path="/score" element={<Score />} />
          <Route path="*" element={<Notfound />} /> */}
    </Routes>
  );
};
export default App;
/**
 * 環境構築方法
 */
// npx create-react-app my-app --template typescript
// npm install @mui/material @mui/icons-material
// npm install @mui/styled-engine @emotion/styled @emotion/react
// npm i markdown-to-js;
// 同階層にglobal.d.tsを作成し「declare module "*.md";」を追記
//  npm install react-router-dom
// npm i js-hira-kata-romanize
// npm install axios --save
