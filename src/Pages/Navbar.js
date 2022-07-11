import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Avatar,
  Menu,
  MenuItem
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/auth-slice";
import { toast } from "react-toastify";
import ForumIcon from "@mui/icons-material/Forum";
import {getDataFromLocal} from "../Hooks/useLocalStorage"

export default function Navbar() {
  const dispatch = useDispatch();
  let uname= getDataFromLocal("user","user profile")

  const [open, setOpen] = useState(false);
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
  });

  const logoutHandler = ()=>{
    dispatch(logout(false));
    toast.success("Successfully Logout!", {
      toastId: "logout-success",
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  
  }

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
          <ForumIcon/>  Bubble
          </Typography>
          <ForumIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Avatar
            alt={uname.username.toUpperCase()}
            src="/static/images/avatar/1.jpg"
            onClick={(e) => setOpen(true)}
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
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
           <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </AppBar>
    </>
  );
}
