import React, { useState } from "react";
import { Box, Stack, Avatar, Input, Button, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addPosts } from "../../Features/post-slice";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify"

function AddPost() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

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
      toast.success("Successfully posted!!", {
        toastId: "post-success",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.warning("Please fill all the fields", {
        toastId: "add-post-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });    }
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
            G
          </Avatar>
          <Input
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
