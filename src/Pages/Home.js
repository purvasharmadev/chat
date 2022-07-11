import React from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "../Components/SideNavbar/sidebar";
import Feed from "../Components/Feed/feed";
import Rightbar from "../Components/Rightbar/rightbar";

export default function Home() {
  return (
    <Box>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent={"space-between"}>
      <Sidebar sx={{flex:2}}/>
      <Feed sx={{flex:6}}/>
      <Rightbar sx={{flex:1}}/>
      </Stack>
    </Box>
  );
}
