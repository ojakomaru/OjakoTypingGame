import React, { FC, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Config";
import { Route as AppRoute } from "./@types/Route";
import { PageDefault } from "./Components/PageDefault";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { TypingDataProvider, ThemeModeContext } from "./Contexts";
import { getAppTheme } from "./styles/defaultTheme";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "./@types/appTheme";

const App: FC = () => {
  const [mode, setMode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(DARK_MODE_THEME);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) =>
          prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME
        );
      },
    }),
    []
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const addRoute = (route: AppRoute) => (
    <Route
      key={route.key}
      path={route.path}
      Component={route.component || PageDefault}
    />
  );

  return (
    <TypingDataProvider>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <BrowserRouter>
            <Routes>
              {routes.map((route: AppRoute) =>
                route.subRoutes
                  ? route.subRoutes.map((item: AppRoute) => addRoute(item))
                  : addRoute(route)
              )}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </TypingDataProvider>
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
