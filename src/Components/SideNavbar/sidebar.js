import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Switch,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import FeedIcon from "@mui/icons-material/Feed";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Sidebar({mode,setMode}) {
  return (
    <Box
      flex={1}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed" color={"text.primary"}
>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="My Feed" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <Switch 
          onChange={e=>
          setMode(mode==='dark'?'light':'dark') }
          defaultChecked
          />
        </ListItemButton>
      </List>

      </Box>
    </Box>
  );
}

export default Sidebar;
