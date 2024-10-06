import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h3"> 🎶 MUSIC NOTES 🎶</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
