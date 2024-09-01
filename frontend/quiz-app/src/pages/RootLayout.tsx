import { Outlet } from "react-router-dom";
import AvatorImage from "../assets/avatar.png";
import { Paper } from "@mui/material";

function RootLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "80px 1fr",
      }}
    >
      <Paper square elevation={1}>
        <nav
          style={{
            padding: "8px",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img src="/quizzle-logo.svg" alt="logo" />
          <img src={AvatorImage} alt="avatar" />
        </nav>
      </Paper>
      <Outlet />
    </div>
  );
}

export default RootLayout;
