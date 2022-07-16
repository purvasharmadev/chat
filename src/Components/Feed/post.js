import React, { useState } from "react";
import { deletePost, likePost, dislikePost } from "../../Features/post-slice";
import { useDispatch } from "react-redux";
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
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
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
}) {
  let uname = getDataFromLocal("user", "user profile");
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const deletePostHandler = (id) => {
    dispatch(
      deletePost({
        id: id,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };

  const likePostHandler = (id) => {
    dispatch(
      likePost({
        id: id,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };

  const dislikePostHandler = (id) => {
    dispatch(
      dislikePost({
        id: id,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };
  return (
    <Card className="m-1">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {username.slice()[0].toUpperCase()}
          </Avatar>
        }
        title={username}
        subheader={date}
      />
      {edit ? (
        <CardContent>
          <EditPost content={content} id={item._id} setEdit={setEdit} />
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {content}
          </Typography>
        </CardContent>
      )}

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
          <IconButton aria-label="comment">
            <ForumIcon />
          </IconButton>
        </Tooltip>

        <Typography component="span" className="color-secondary text-small">
          {commentCount}
        </Typography>

        <Tooltip title="save">
          <IconButton aria-label="bookmark">
            <BookmarkAddIcon />
          </IconButton>
        </Tooltip>

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
