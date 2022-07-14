import React,{useState} from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "../Components/SideNavbar/sidebar";
import Feed from "../Components/Feed/feed";
import Rightbar from "../Components/Rightbar/rightbar";
import {createTheme,ThemeProvider} from "@mui/material"


export default function Home() {
  const [mode,setMode] = useState('dark')

  const darkTheme = createTheme({
    palette:{
      mode:mode,
     }
  })
  return (
    <ThemeProvider theme={darkTheme}>
    <Box bgcolor={"background.default"} color={"white"}
    >
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent={"space-between"}>
      <Sidebar mode={mode} setMode={setMode}  sx={{flex:2}}/>
      <Feed sx={{flex:6}}/>
      <Rightbar  sx={{flex:1}}/>
      </Stack>
    </Box>
    </ThemeProvider>
  );
}
