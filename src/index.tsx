import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "./styles/defaultTheme";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { TypingDataProvider } from "./Contexts/AppContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TypingDataProvider>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </TypingDataProvider>
);

/**
 * 環境構築方法
 */
// npx create-react-app my-app --template typescript
// npm install @mui/material @mui/icons-material
// npm install @mui/styled-engine @emotion/styled @emotion/react
// npm i markdown-to-js;
// 同階層にglobal.d.tsを作成し「declare module "*.md";」を追記
//  npm install react-router-dom
// kuroshiroライブラリと依存関係の解決
// Analyzerの辞書ファイルのローカル化

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
