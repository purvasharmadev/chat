import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from "react-router-dom";
import { followUser, unfollowUser, getUser } from "../../Features/user-slice";
import { useDispatch, useSelector } from "react-redux";

function User({ fname, lname, bio, uname, img, id }) {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(getUser);
  const followHandler = (id) => {
    dispatch(
      followUser({
        id: id,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };
  const unfollowHandler = (id) => {
    dispatch(
      unfollowUser({
        id: id,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };
  return (
    <List alignItems="center">
      <ListItem
        alignItems="flex-start"
        sx={{ padding: "0px 2px", margin: "0px 2px" }}
      >
        <ListItemAvatar>
          <Avatar alt={fname} src={img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              {`${fname}  ${lname} `}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                color="text.secondary"
                onClick={() => {
                  navigateTo(`/profile/${id}`);
                }}
                className="cursor-pointer"
              >
                {`@${uname}`}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography component="span" sx={{ display: "block" }}>
                {userInfo.following && userInfo.following.findIndex((i) => i._id === id) !== -1 ? (
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<PersonRemoveIcon />}
                    onClick={() => unfollowHandler(id)}
                  >
                    UnFollow
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<PersonAddIcon />}
                    onClick={() => followHandler(id)}
                  >
                    Follow
                  </Button>
                )}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

export default User;
