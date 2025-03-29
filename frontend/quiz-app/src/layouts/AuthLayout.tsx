import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";

function AuthLayout() {
  const theme = useTheme();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: `radial-gradient(${theme.palette.accent.main}, ${theme.palette.primary.main})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={2} sx={{ padding: "32px" }}>
        <Outlet />
      </Paper>
    </div>
  );
}

export default AuthLayout;
