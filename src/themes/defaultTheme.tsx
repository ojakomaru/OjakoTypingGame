import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
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
export default defaultTheme;
