import React from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "../Components/SideNavbar/sidebar"

export default function Home() {
  return (
    <Box>
      <Navbar/>
      <Stack>
      <Sidebar/>
      </Stack>
    </Box>
  );
}
