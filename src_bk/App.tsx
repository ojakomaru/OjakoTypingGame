import React, { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
// import Play from "./Components/Pages/Play";
import AddTyping from "./Components/Pages/AddTyping";

const playSetting = {
  isROMAZI: true,
  isKANA: true,
  isKeyGuide: true,
  isShowWPM: true,
  isSpeedBer: true,
};

const App: FC = () => {
  return (
    <Routes>
      {/*RouteにHomeを設定する*/}
      <Route
        path="/"
        element={
          <HomePage
          />
        }
      />
      {/* <Route
        path="/play"
        element={
          <Play
          />
        }
      /> */}
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
// yarn add --dev @types/styled-components;
// yarn add styled-components
