import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost, dislikePost } from "../../Features/post-slice";
import {
  saveToBookmark,
  getUser,
  removeFromBookmark,
} from "../../Features/user-slice";

import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardHeader,
  Avatar,
  Tooltip,
} from "@mui/material";
import { getDataFromLocal } from "../../Hooks/useLocalStorage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditPost from "./editPost";

function Post({
  item,
  username,
  content,
  date,
  likeCount,
  likedBy,
  commentCount,
  dp
}) {
  let uname = getDataFromLocal("user", "user profile");
  let token = getDataFromLocal("token", null);
  const dispatch = useDispatch();

  const { bookmark ,user} = useSelector(getUser);
  const [edit, setEdit] = useState(false);
  const navigateTo = useNavigate();


  const deletePostHandler = (id) => {
    dispatch(
      deletePost({
        id: id,
        token: token,
      })
    );
    navigateTo("/");
  };

  const likePostHandler = (id) => {
    dispatch(
      likePost({
        id: id,
        token: token,
      })
    );
  };

  const dislikePostHandler = (id) => {
    dispatch(
      dislikePost({
        id: id,
        token: token,
      })
    );
  };

  const saveToBookmarkHandler = (id) => {
    dispatch(
      saveToBookmark({
        id: id,
        token: token,
      })
    );
  };

  const removeFromBookmarkHandler = (id) => {
    dispatch(
      removeFromBookmark({
        id: id,
        token: token,
      })
    );
  };

  return (
    <Card className="m-1">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:"skyblue" }} src={dp} aria-label="post">
            {username.slice()[0].toUpperCase()}
          </Avatar>
        }
        title={username}
        subheader={date}
      />
      <CardContent>
        {edit ? (
          <EditPost content={content} id={item._id} setEdit={setEdit} />
        ) : (
          <Typography variant="body2" color="text.primary">
            {content}
          </Typography>
        )}
      </CardContent>

      <CardActions disableSpacing>
        {likedBy.findIndex((i) => i.username === uname.username) === -1 ? (
          <>
            <Tooltip title="like">
              <IconButton
                onClick={() => likePostHandler(item._id)}
                aria-label="add to favorites"
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Tooltip>
            <Typography component="span" className="color-secondary text-small">
              {likeCount}
            </Typography>{" "}
          </>
        ) : (
          <>
            <Tooltip title="dislike">
              <IconButton
                onClick={() => dislikePostHandler(item._id)}
                aria-label="add to favorites"
              >
                <FavoriteIcon sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>

            <Typography component="span" className="color-secondary text-small">
              {likeCount}
            </Typography>
          </>
        )}

        <Tooltip title="comment">
          <IconButton
            onClick={() => {
              navigateTo(`/comment/${item._id}`);
            }}
            aria-label="comment"
          >
            <ForumIcon />
          </IconButton>
        </Tooltip>

        <Typography component="span" className="color-secondary text-small">
          {commentCount}
        </Typography>
        {bookmark.findIndex((i) => i === item._id) === -1 ? (
          <Tooltip title="save">
            <IconButton
              onClick={() => saveToBookmarkHandler(item._id)}
              aria-label="add bookmark"
            >
              <BookmarkBorderIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="remove from save">
            <IconButton
              onClick={() => removeFromBookmarkHandler(item._id)}
              aria-label="remove bookmark"
            >
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        )}

        {username === uname.username && (
          <>
            <Tooltip title="edit">
              <IconButton onClick={() => setEdit(true)} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                onClick={() => deletePostHandler(item._id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
