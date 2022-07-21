import { useParams, useNavigate } from "react-router-dom";
import { Box, Stack, Fab } from "@mui/material";
import Post from "../Components/Feed/post";
import Comments from "../Components/Feed/comments";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, postsById } from "../Features/post-slice";
import { getComments } from "../Features/comment-slice";
import WestIcon from "@mui/icons-material/West";

function CommentPage() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const { postStatus, singlePost, post } = useSelector(getPost);
  const { comment } = useSelector(getComments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsById(id));
    // eslint-disable-next-line
  }, [comment, post]);

  return (
    <Box
      flex={6}
      alignItems="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <Box m={2}>
        <Fab
          onClick={() => navigateTo("/")}
          size="small"
          color="primary"
          aria-label="add"
        >
          <WestIcon />
        </Fab>
      </Box>

      {postStatus === "post loading" && (
        <h2 className="text-center">Loading.....</h2>
      )}
      <Stack flex={6}>
        {/* {id} */}
        {singlePost.length !== 0 && (
          <>
            <Post
              item={singlePost.post}
              date={singlePost.post.createdAt.split("T")[0]}
              username={singlePost.post.username}
              content={singlePost.post.content}
              likeCount={singlePost.post.likes.likeCount}
              likedBy={singlePost.post.likes.likedBy}
              commentCount={singlePost.post.comments.length}
            />
            <Comments id={id} username={singlePost.post.username} />
          </>
        )}
      </Stack>
    </Box>
  );
}

export default CommentPage;
