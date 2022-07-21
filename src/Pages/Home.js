import React from "react";
import { Box } from "@mui/material";

import Feed from "../Components/Feed/feed";

export default function Home() {
  return (
    <Box sx={{ flex: 6 }} bgcolor={"background.default"} color={"white"}>
      <Feed />
    </Box>
  );
}
