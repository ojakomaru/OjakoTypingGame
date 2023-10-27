import { Theme, createTheme, responsiveFontSizes } from "@mui/material";
import { AppMode } from "../@types/AppMode";

export const getAppTheme = (mode: AppMode): Theme => {
  let defaultTheme = createTheme({
    palette: {
      mode,
      // primary: {
      //   light: "#757ce8",
      //   main: "#3f50b5",
      //   dark: "#002884",
      //   contrastText: "#fff",
      // },
      // secondary: {
      //   light: "#ff7961",
      //   main: "#f44336",
      //   dark: "#ba000d",
      //   contrastText: "#000",
      // },
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
