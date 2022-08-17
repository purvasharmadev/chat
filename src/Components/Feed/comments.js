import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Input,
  Button,
  Card,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getComments,
  editComments,
  deleteComments,
  upvoteComments,
  downvoteComments,
  comments,
  addComments,
} from "../../Features/comment-slice";
import { getAuth } from "../../Auth/auth-slice";
import { useSelector, useDispatch } from "react-redux";
import { getDataFromLocal } from "../../Hooks/useLocalStorage";
import { toast } from "react-toastify";

function Comments({ username, id,dp }) {
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [edit, setEdit] = useState({
    state: false,
    id: "",
  });
  const { comment, commentsError } = useSelector(getComments);
  const { user } = useSelector(getAuth);

  const dispatch = useDispatch();
  const uname = getDataFromLocal("user", user);

  useEffect(() => {
    if (commentsError === undefined) {
      toast.error("something went wrong!! try again later", {
        toastId: "user-error-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error(commentsError, {
        toastId: "user-error-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }, [commentsError]);

  // add a comment
  const addCommentHandler = (id, text) => {
    if (newComment !== "") {
      dispatch(
        addComments({
          id: id,
          text: text,
          token: JSON.parse(localStorage.getItem("token")),
        })
      );
      setNewComment("");
    } else {
      toast.warning("Please fill all the fields", {
        toastId: "empty-comment-field-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const changeHandler = (e) => {
    setNewComment(e.target.value);
  };

  //edit a comment
  const editCommentHandler = (commentId, postId, text) => {
    dispatch(
      editComments({
        commentId: commentId,
        postId: postId,
        text: text,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
    setEditComment("");
    setEdit("");
  };

  const editChangeHandler = (e) => {
    setEditComment(e.target.value);
  };

  // delete comment

  const deleteHandler = (commentId, postId) => {
    dispatch(
      deleteComments({
        commentId: commentId,
        postId: postId,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };

  // upvote a comment
  const upvoteHandler = (commentId, postId) => {
    dispatch(
      upvoteComments({
        commentId: commentId,
        postId: postId,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };

  // downvote a comment
  const downvoteHandler = (commentId, postId) => {
    dispatch(
      downvoteComments({
        commentId: commentId,
        postId: postId,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
  };

  useEffect(() => {
    dispatch(comments(id));
    // eslint-disable-next-line
  }, []);

  return (
    <Box m={2}>

      <Stack direction="row" spacing={2} alignItems="center">
 
        <Avatar
          aria-label="avatar"
          src={uname.dp}
          alt={username.slice()[0].toUpperCase()}
          sx={{ width: 30, height: 30 }}
        ></Avatar>
        <Input
          sx={{ flex: 2 }}
          onChange={(e) => changeHandler(e)}
          value={newComment}
          placeholder="Add a comment"
        />
        <Button
          onClick={() => addCommentHandler(id, newComment)}
          size="small"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Button>
      </Stack>

      <Box mt={2} className={comment.comments && comment.comments.length > 2 ? "" : "h-100"}>
        <Stack direction="column" spacing={2}>
          {comment.comments ? (
            comment.comments.map((i,index) => {
              return (
                <Card key={index} className="mb-1">
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="avatar"
                        sx={{ width: 30, height: 30 }}
                       src={i.dp}
                      >
                        {i.username.slice()[0].toUpperCase()}
                      </Avatar>
                    }
                    title={i.username}
                  />
                  <CardContent>
                    {edit.state && edit.id === i._id ? (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Input
                          sx={{ flex: 2 }}
                          onChange={(e) => editChangeHandler(e)}
                          value={editComment}
                          placeholder="Add a comment"
                        />
                        <Button
                          onClick={() => {
                            editCommentHandler(i._id, id, editComment);
                          }}
                          size="small"
                          color="primary"
                          aria-label="add"
                        >
                          <AddIcon />
                        </Button>
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.primary">
                        {i.commentData}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    {uname.username === i.username && (
                      <>
                        <Tooltip title="edit">
                          <IconButton
                            onClick={() => (
                              setEdit({
                                ...edit,
                                state: !edit.state,
                                id: i._id
                              }),
                              setEditComment(i.commentData)
                            )}
                            aria-label="edit"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton
                            onClick={() => deleteHandler(i._id, id)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="upvote">
                      {i.votes.upvotedBy.findIndex(
                        (i) => i.username === uname.username
                      ) === -1 ? (
                        <IconButton
                          onClick={() => upvoteHandler(i._id, id)}
                          aria-label="upvote"
                        >
                          <ThumbUpOffAltIcon />
                        </IconButton>
                      ) : (
                        <IconButton aria-label="upvote">
                          <ThumbUpIcon />
                        </IconButton>
                      )}
                    </Tooltip>
                    <Typography
                      component="span"
                      className="color-secondary text-small"
                    >
                      {i.votes.upvotedBy.length}
                    </Typography>

                    <Tooltip title="downvote">
                    {i.votes.downvotedBy.findIndex(
                        (i) => i.username === uname.username
                      ) === -1 ?
                      <IconButton
                        onClick={() => downvoteHandler(i._id, id)}
                        aria-label="downvote"
                      >
                        <ThumbDownOffAltIcon />
                      </IconButton>:
                       <IconButton
                       aria-label="downvote"
                     >
                       <ThumbDownIcon />
                     </IconButton>
                      }
                    </Tooltip>
                    <Typography
                      component="span"
                      className="color-secondary text-small"
                    >
                      {i.votes.downvotedBy.length}
                    </Typography>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <h1>Be the first one to comment</h1>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default Comments;
