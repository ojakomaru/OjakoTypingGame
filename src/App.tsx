import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Config";
import { Route as AppRoute } from "./@types/Route";
import { PageDefault } from "./Components/PageDefault";


const addRoute = (route: AppRoute) => (
  <Route
    key={route.key}
    path={route.path}
    Component={route.component || PageDefault}
  />
);

const App: FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/form" element={<TypingForm />} />
      <Route path="*" element={<NotFound />} /> */}
      {routes.map((route: AppRoute) =>
        route.subRoutes
          ? route.subRoutes.map((item: AppRoute) => addRoute(item))
          : addRoute(route)
      )}
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
