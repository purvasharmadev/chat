import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, posts } from "../../Features/post-slice";
import { Box, Stack } from "@mui/material";
import Post from "./post";
import AddPost from "./addPost";
import {toast} from "react-toastify"


function Feed() {
  const { postStatus, postError, post } = useSelector(getPost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(posts());
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    if(postError === undefined){
      toast.error("something went wrong!! try again later", {
        toastId: "error-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }else{    console.log("postError ", postError)

      toast.error(postError, {
        toastId: "error-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
  },[postError])

  return (
    <Box flex={6} alignItems="center" justifyContent="center">
      <AddPost />
      {postError && <h1>{postError}</h1>}
      {postStatus === "post loading" && <h2>Loading.....</h2>}
      <Stack direction="column-reverse">
        {post.length !== 0 &&
          post.posts.map((item) => {
            return (
              <Post
               item={item}
                key={item._id}
                date={item.createdAt.split("T")[0]}
                username={item.username}
                content={item.content}
                likeCount={item.likes.likeCount}
                commentCount={item.comments && item.comments.length}
              />
            );
          })}
      </Stack>
    </Box>
  );
}

export default Feed;
