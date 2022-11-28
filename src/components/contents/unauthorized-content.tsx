import { ClockIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function UnauthorizedContent() {
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
      <Card sx={{ maxWidth: 350, pb: 1, pt: 2, px: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ pb: 3 }}>
            You are not authorized to view this page
          </Typography>
          <Typography variant="body1">
            Please click on the button below to gain access to the system. If
            you forgot your credentials, or do not have any, reach out to your
            system admin.
          </Typography>
          <Button
            variant="contained"
            onClick={() => signIn("credentials", { callbackUrl: "/" })}
            sx={{ mt: 2 }}
          >
            Sign in
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
