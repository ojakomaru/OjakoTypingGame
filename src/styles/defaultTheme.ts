import { Theme, createTheme, responsiveFontSizes } from "@mui/material";
import { AppMode } from "../@types/AppMode";
import { grey } from "@mui/material/colors";

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
      success: {
        main: "#312114",
      },
      ...(mode === "light"
        ? { // is LightMode
            text: {
              primary: "#2d0303",
            },
            background: {
              default: "#FBE9D6",
            },
          }
        : { // is DarkMode
            text: {
              primary: grey[500],
            },
            background: {
              default: "#492500",
            },
          }),
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
