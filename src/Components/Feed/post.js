import React from 'react'
import {Card, CardContent, Typography, CardActions, IconButton,CardHeader,Avatar} from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

function Post({username,content,date,likeCount,commentCount}) {
  return (
    <Card className="m-1">
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          {username.slice()[0].toUpperCase()}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
        </IconButton>
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
      <IconButton aria-label="add to favorites">
        <FavoriteBorderIcon/>
      </IconButton>
      <Typography component="span" className="color-secondary text-small">
          {likeCount}
        </Typography>

      <IconButton aria-label="comment">
        <ForumIcon/>
      </IconButton>
      <Typography component="span" className="color-secondary text-small">
          {commentCount}
        </Typography>
      <IconButton aria-label="bookmark">
      <BookmarkAddIcon/>
      </IconButton>
    </CardActions>
</Card>
  )
}

export default Post