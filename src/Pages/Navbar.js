import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/auth-slice";
import { toast } from "react-toastify";
import ForumIcon from "@mui/icons-material/Forum";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate()
  const currUser = JSON.parse(localStorage.getItem('user'))
  const [open, setOpen] = useState(false);
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  const logoutHandler = () => {
    dispatch(logout(false));
    toast.success("Successfully Logout!", {
      toastId: "logout-success",
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <ForumIcon /> Bubble
          </Typography>
          <ForumIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Avatar
            alt={currUser.username.toUpperCase()}
            src={currUser.dp}
            onClick={(e) => setOpen(true)}
            className="cursor-pointer"
          />
        </StyledToolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          // anchorEl={}
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          <MenuItem onClick={()=>navigateTo('/userprofile')}>Profile</MenuItem>
          <MenuItem onClick={()=>navigateTo('/bookmark')} sx={{ display: { xs: "block", sm: "none" } }}>Bookmarks</MenuItem>
          <MenuItem onClick={()=>navigateTo('/user-feed')} sx={{ display: { xs: "block", sm: "none" } }}>My Feed</MenuItem>
          <MenuItem onClick={()=>navigateTo('/trending')} sx={{ display: { xs: "block", sm: "none" } }}>Trending</MenuItem>
          <MenuItem onClick={()=>navigateTo('/')} sx={{ display: { xs: "block", sm: "none" } }}>Explore</MenuItem>
        </Menu>
      </AppBar>
    </>
  );
}
