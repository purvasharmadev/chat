import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, posts } from "../../Features/post-slice";
import { Box } from "@mui/material";
import Post from "./post";

function Feed() {
  const { postStatus, postError, post } = useSelector(getPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(posts());
    //eslint-disable-next-line
  }, []);

  return (
    <Box flex={6} alignItems="center" justifyContent="center">
      {postError && <h1>{postError}</h1>}
      {postStatus === "post loading" && <h2>Loading.....</h2>}
      {post.length !== 0 &&
        post.posts.map((item) => {
          return (
            <Post
              key={item._id}
              date={item.createdAt.split("T")[0]}
              username={item.username}
              content={item.content}
              likeCount={item.likes.likeCount}
              commentCount={item.comments.length}
            />
          );
        })}
    </Box>
  );
}

export default Feed;
