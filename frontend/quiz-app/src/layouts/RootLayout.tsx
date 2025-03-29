import {
  CircularProgress,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AvatorImage from "../assets/avatar.png";
import { useLogOutMutation } from "../services/authQueryHooks";

function RootLayout() {
  const navigate = useNavigate();
  const logoutMutation = useLogOutMutation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSettings = () => {
    setOpen(false);
    // Navigate to settings page - to be implemented
    console.log("Settings clicked");
  };

  const handleLogoutClick = () => {
    setOpen(false);
    logoutMutation.mutate();
  };

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
            alignItems: "center",
          }}
        >
          <img
            src="/quizzle-logo.svg"
            alt="logo"
            style={{ cursor: "pointer", height: "100%" }}
            onClick={() => navigate("/")}
          />

          <IconButton
            ref={anchorRef}
            onClick={handleToggle}
            size="small"
            sx={{ p: 0 }}
            aria-controls={open ? "avatar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <CircularProgress size={40} />
            ) : (
              <img src={AvatorImage} alt="avatar" style={{ width: "40px", height: "40px" }} />
            )}
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            style={{ zIndex: 1000 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === "bottom-end" ? "right top" : "right bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="avatar-menu"
                      aria-labelledby="avatar-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleSettings}>Settings</MenuItem>
                      <MenuItem onClick={handleLogoutClick} disabled={logoutMutation.isPending}>
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </nav>
      </Paper>
      <Outlet />
    </div>
  );
}

export default RootLayout;
