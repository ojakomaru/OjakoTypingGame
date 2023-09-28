import React, { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Play from "./Pages/Play";
import AddTyping from "./Pages/AddTyping";

const playSetting = {
  isROMAZI: true,
  isKANA: true,
  isKeyGuide: true,
  isShowWPM: true,
  isSpeedBer: true,
};

const App: FC = () => {
  const [problemNo, setProblemNo] = useState<string>(""); //出題問題ID
  const [score, setScore] = useState<number>(0); //ゲームスコア
  return (
    <Routes>
      {/*RouteにHomeを設定する*/}
      <Route
        path="/"
        element={
          <Home
            problemNo={problemNo}
            setProblemNo={setProblemNo}
            setting={playSetting}
            score={score}
            setScore={setScore}
          />
        }
      />
      <Route
        path="/play"
        element={
          <Play
            problemNo={problemNo}
            setting={playSetting}
            score={score}
            setScore={setScore}
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
