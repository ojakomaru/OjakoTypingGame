import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Play from "./Components/Pages/Play";
import AddTyping from "./Components/Pages/AddTyping";


const App: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
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
