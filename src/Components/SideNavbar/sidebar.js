import React from "react";
import {getPost,allPost,posts} from "../../Features/post-slice";
import { getAuth } from "../../Auth/auth-slice";
import {useSelector,useDispatch} from "react-redux"
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
  const {post } = useSelector(getPost)
  const {user} = useSelector(getAuth)
  const dispatch = useDispatch()

  const myFeed = ()=>{
    let newPost = post.posts.filter((i)=>i.username === user.username)
    return {posts:newPost}
  }

  return (
    <Box
      flex={1}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed" color={"text.primary"}
>
      <List>
        <ListItemButton onClick={()=>dispatch(posts())}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>

        <ListItemButton onClick={()=>dispatch(allPost(myFeed()))}>
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
