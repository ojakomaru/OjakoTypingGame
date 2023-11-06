import { Theme, createTheme, responsiveFontSizes } from "@mui/material";
import { AppMode } from "../@types/AppMode";

export const getAppTheme = (mode: AppMode): Theme => {
  let defaultTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#CD853F",
      },
      secondary: {
        main: "#F08F00",
      },
      background: {
        default: "#FBE9D6",
      },
      success: {
        main: "#312114",
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
