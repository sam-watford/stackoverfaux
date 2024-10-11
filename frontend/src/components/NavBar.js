import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Typography,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    handleProfileClose();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography
            variant="h4"
            component={Link}
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Stackoverfaux
          </Typography>

          <Box>
            {user ? (
              <>
                <Avatar
                  onClick={handleProfileClick}
                  style={{ cursor: "pointer" }}
                >
                  {user.charAt(0)}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileClose}
                >
                  <MenuItem>{user}</MenuItem>
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
