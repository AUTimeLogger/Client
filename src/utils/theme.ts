import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const shadowRing = "0 0 #000";
const shadowChannel = "1 1 1";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#7466ef",
    },
    secondary: {
      main: "#ff9e43",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgb(229, 231, 235)",
          borderRadius: 12,
          boxShadow: "0 2px 5px -4px rgba(0,0,0,0.34)",
        },
      },
    },
  },
});

export default theme;
