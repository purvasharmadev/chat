import React from "react";
import {useNavigate} from "react-router-dom"
import {getDataFromLocal} from "../../Hooks/useLocalStorage";
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
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Sidebar({mode,setMode}) {
  const navigateTo = useNavigate()
  const currUser = getDataFromLocal('user', 'user')

  return (
    <Box
      flex={1}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed" color={"text.primary"}
>
      <List>
        <ListItemButton onClick={()=> navigateTo('/')}>
         <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore"  />
        </ListItemButton>


        <ListItemButton onClick={()=>navigateTo('/user-feed')}>
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="My Feed" />
        </ListItemButton>

        <ListItemButton onClick={()=>navigateTo('/trending')}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Trending" />
        </ListItemButton>

        <ListItemButton onClick={()=>navigateTo('/bookmark')}>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItemButton>

        <ListItemButton onClick={()=>navigateTo(`/profile/${currUser._id}`)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
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
