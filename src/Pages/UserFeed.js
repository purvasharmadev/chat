import React from "react";
import { Box, Stack } from "@mui/material";

import Post from "../Components/Feed/post";
import { getUser } from "../Features/user-slice";
import { getPost } from "../Features/post-slice";
import { useSelector} from "react-redux";

function UserFeed() {
  const { userInfo } = useSelector(getUser);
  const { post } = useSelector(getPost);
  let myPost = [];

  if (post.length !== 0 && userInfo.length !== 0) {
    myPost = post.posts.filter((i) => {
      return userInfo.following.find((item) => item.username === i.username);
    });
  }

  return (
    <Box flex={6} m={2} className={myPost.length > 2 ? "" : "h-100"}>
      <h2>My Feed</h2>
      <Stack direction="column-reverse">
        {myPost.length !== 0 &&
          myPost.map((item) => {
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
      {myPost.length === 0 && (
        <h2 className="text-center">Follow some users!</h2>
      )}
    </Box>
  );
}

export default UserFeed;
