import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingContent() {
  return (
    <Box
      sx={{
        bgcolor: "#F3F4F6",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" size={20} />
    </Box>
  );
}
