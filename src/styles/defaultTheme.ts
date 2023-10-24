import { Theme, createTheme, responsiveFontSizes } from "@mui/material";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "../@types/appTheme";

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME): Theme => {
  let defaultTheme = createTheme({
    palette: {
      mode,
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
    typography: {
      fontSize: 14,
      fontFamily: [
        "Roboto",
        '"Noto Sans JP"',
        '"Helvetica"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });
  defaultTheme = responsiveFontSizes(defaultTheme);
  return defaultTheme;
};
