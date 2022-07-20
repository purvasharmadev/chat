import React,{useEffect} from 'react';
import {Box} from "@mui/material";
import Post from '../Components/Feed/post';
import {getDataFromLocal} from "../Hooks/useLocalStorage";
import {getBookmarkedPostList, getBookmark} from "../Features/bookmark-slice";
import {useSelector,useDispatch} from "react-redux"

function Bookmark() {
    let token = getDataFromLocal("token", "user")
    const {bookmark} = useSelector(getBookmark)
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getBookmarkedPostList(token))
    },[])
    console.log("bookmark ", bookmark)
  return (
    <Box flex={6} m={2} className="h-100">
      {
        bookmark.length !== 0 ? <h1>Here a re all your post</h1> : <h2>Add some post to your bookmark</h2>
      }
        {/* <Post username={uname} content="test post" date="2/11/22" likeCount="3" /> */}
    </Box>
  )
}

export default Bookmark