import React, { FC, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Config";
import { Route as AppRoute } from "./@types/Route";
import { PageDefault } from "./Components/PageDefault";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import {
  TypingDataProvider,
  ThemeModeContext,
  SettingDataProvider,
  AuthProvider,
} from "./Contexts";
import { getAppTheme } from "./styles/defaultTheme";
import { DARK_THEME, LIGHT_THEME, AppMode } from "./@types";

const App: FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? DARK_THEME
    : LIGHT_THEME;
  const [mode, setMode] = useState<AppMode>(prefersDarkMode);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) =>
          prevMode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
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
    <AuthProvider>
      <TypingDataProvider>
        <SettingDataProvider>
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
        </SettingDataProvider>
      </TypingDataProvider>
    </AuthProvider>
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
// npm i -D eslint
// npx eslint --init