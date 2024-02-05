import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>{"OjakoTypingGame"}</title>
        <meta name="description" content={"おジャコのタイピング練習ゲーム"} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
    </HelmetProvider>
    <App />
  </React.StrictMode>
);

/**
 * 環境構築方法
 */
// npx create-react-app my-app --template typescript
// npm install @mui/material @mui/icons-material
// npm install @mui/styled-engine @emotion/styled @emotion/react
// npm i react-helmet
// npm install hamburger-react
// 同階層にglobal.d.tsを作成し「declare module "*.md";」を追記
//  npm install react-router-dom
// kuroshiroライブラリと依存関係の解決
// Analyzerの辞書ファイルのローカル化

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
