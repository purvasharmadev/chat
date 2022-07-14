import React from "react";
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

function Post({ username, content, date, likeCount, commentCount }) {
  let uname = getDataFromLocal("user", "user profile");

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

      <CardContent>
        <Typography variant="body2" color="text.primary">
          {content}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <Tooltip title="like">
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>

        <Typography component="span" className="color-secondary text-small">
          {likeCount}
        </Typography>

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
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton aria-label="delete">
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
