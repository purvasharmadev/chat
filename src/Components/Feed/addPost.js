import React, { useState } from "react";
import { Box, Stack, Avatar, Input, Button, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { addPosts } from "../../Features/post-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {getDataFromLocal} from "../../Hooks/useLocalStorage";

function AddPost() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const uname = getDataFromLocal('user','u')

  const changeHandler = (e) => {
    setContent(e.target.value);
  };

  const addPostHandler = (item) => {
    if (content !== "") {
      dispatch(
        addPosts({
          item: item,
          token: JSON.parse(localStorage.getItem("token")),
        })
      );
      setContent("");
    } else {
      toast.warning("Please fill all the fields", {
        toastId: "empty-field-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
  return (
    <Box m={2}>
      <Card>
        <Stack
          direction="row"
          spacing={2}
          p={2}
          alignItems="center"
          justifyContent="center"
        >
          <Avatar sx={{ bgcolor: "red" }} aria-label="avatar">
          {uname.username.slice()[0].toUpperCase()}
          </Avatar>
          <TextareaAutosize
            aria-label="minimum height"
            onChange={changeHandler}
            placeholder="What's On your mind??"
            sx={{ flex: 2 }}
            value={content}
          />
          <Button
            onClick={() => addPostHandler(content)}
            size="small"
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default AddPost;
