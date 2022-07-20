import React, { useState } from "react";
import { editPosts } from "../../Features/post-slice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Tooltip, Input, Stack } from "@mui/material";

function EditPost({ id, content, setEdit }) {
  const [editContent, setEditContent] = useState(content);
  const dispatch = useDispatch();

  const closeHandler = (e) => {
    setEdit(false);
  };

  const editPostHandler = (item, id) => {
    dispatch(
      editPosts({
        id: id,
        item: item,
        token: JSON.parse(localStorage.getItem("token")),
      })
    );
    setEdit(false);
  };
  const changeHandler = (e) => {
    setEditContent(e.target.value);
  };
  return (
    <Stack direction="row" spacing="2">
      <Input
        onChange={changeHandler}
        placeholder="What's On your mind??"
        sx={{ flex: "1", width: "100%" }}
        value={editContent}
      />
      <Tooltip title="edit">
        <IconButton
          onClick={() => editPostHandler(editContent, id)}
          aria-label="edit"
        >
          <DoneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="cancel">
        <IconButton onClick={(e) => closeHandler(e)} aria-label="edit">
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default EditPost;
