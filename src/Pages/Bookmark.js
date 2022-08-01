import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { Box,Stack,Fab } from "@mui/material";
import Post from "../Components/Feed/post";
import { getDataFromLocal } from "../Hooks/useLocalStorage";
import {getUser,getBookmarkedPostList} from "../Features/user-slice";
import { getPost } from "../Features/post-slice";
import { useSelector, useDispatch } from "react-redux";
import WestIcon from "@mui/icons-material/West";


function Bookmark() {
  let token = getDataFromLocal("token", "user");
  const navigateTo = useNavigate()
  const {bookmark, userStatus} = useSelector(getUser)
  const {post} = useSelector(getPost)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookmarkedPostList(token));
    // eslint-disable-next-line
  }, []);

  const filterBookmarks = post.posts.filter((item)=>bookmark.includes(item._id))
  


  return (
    <Box flex={6} m={2} direction="row-reverse" className={filterBookmarks.length > 2? "":"h-100"}>
      <h3>Bookmarks</h3>
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
      {userStatus === 'loading bookmarks list' && <Box className="border text-center">
        <h3>loading...</h3>
        </Box>}

      <Stack direction="column-reverse">
      {filterBookmarks.length !== 0 ? (
          filterBookmarks.map((item) => {
          return (
            <>
              <Post
                item={item}
                key={item._id}
                date={item.createdAt.split("T")[0]}
                username={item.username}
                dp={item.dp}
                content={item.content}
                likeCount={item.likes.likeCount}
                likedBy={item.likes.likedBy}
                commentCount={item.comments.length}
              />{" "}
            </>
          );
        })
      ) : (
        <h2 className="text-center">Add some post to your bookmark</h2>
      )}
      </Stack>

    </Box>
  );
}

export default Bookmark;
