import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, posts } from "../Features/post-slice";
import { Box,Stack,Fab } from "@mui/material";
import Post from "../Components/Feed/post";
import { toast } from "react-toastify";
import WestIcon from "@mui/icons-material/West";
import {useNavigate} from "react-router-dom"


function Trending() {
    const { postStatus, postError, post } = useSelector(getPost);
    const dispatch = useDispatch();
    const navigateTo = useNavigate()
    useEffect(() => {
      dispatch(posts());
      // eslint-disable-next-line
    }, []);
  
    useEffect(() => {
      if (postError === undefined) {
        toast.error("something went wrong!! try again later", {
          toastId: "error-failed",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.error(postError, {
          toastId: "error-failed",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    }, [postError]);
  
    let trendingPost = post.posts.slice().sort((a,b)=> b.likes.likeCount - a.likes.likeCount)

  return (
    <Box flex={6} m={2}alignItems="center" justifyContent="center">
     <h2>Trending</h2>
      {postStatus === "post loading" && (
        <h2 className="text-center">Loading.....</h2>
      )}
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
 
      <Stack direction="column">
        {trendingPost.length !== 0 &&
          trendingPost.map((item) => {
            return (
              <Post
                item={item}
                key={item._id}
                date={item.createdAt.split("T")[0]}
                username={item.username}
                content={item.content}
                likeCount={item.likes.likeCount}
                likedBy={item.likes.likedBy}
                commentCount={item.comments.length}
                dp={item.dp}
              />
            );
          })}
      </Stack>
    </Box>  )
}

export default Trending