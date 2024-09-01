import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText?: string;
    };
  }
}

export default createTheme({
  palette: {
    primary: {
      light: "#175676",
      main: "#175676",
      dark: "#175676",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FF9F1C",
      main: "#FF9F1C",
      dark: "#FF9F1C",
      contrastText: "#000",
    },
    accent: {
      light: "#2BA0DC",
      main: "#2BA0DC",
      dark: "#2BA0DC",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: [
      "Barlow",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
