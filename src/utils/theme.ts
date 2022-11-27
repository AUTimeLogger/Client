import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
