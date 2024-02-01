import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { IoIosSettings } from "react-icons/io";
export default function Header({ toggleDrawer, activeComponent }) {
  return (
    <Box
      sx={{
        padding: "20px 0 20px 0",
        marginBottom: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        color="textSecondary"
        fontFamily={"Montserrat"}
        align="left"
        variant="h5"
      >
        {activeComponent
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLowerCase()}
      </Typography>

      <IconButton
        aria-label="menu"
        color="green"
        size="large"
        onClick={toggleDrawer(true)}
      >
        <IoIosSettings />
      </IconButton>
    </Box>
  );
}
