import React,{useEffect} from 'react';
import {Box} from "@mui/material"
import User from "../Users/user"
import {getUser,users} from "../../Features/user-slice"
import {useSelector,useDispatch} from "react-redux"

function Rightbar() {
  const {user, userError,userStatus} = useSelector(getUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(users())
    //eslint-disable-next-line
  },[])

  return (
    <Box flex={2} sx={{display:{xs:"none",sm:"block"}}}>
      <Box position="fixed" color={"text.primary"}>
      <h4 className="text-left pl-1 mb-0 color-primary">Who to follow</h4>
      {userError && <h2>{userError}</h2>}
        {userStatus === "user loading" && <h2>Loading......</h2>}
        {user &&
          user.map((item,index)=>{
            return(
              <User key={index} fname={item.firstName} lname={item.lastName} bio={item.bio} uname={item.username}/>
            )
          })}
      </Box>
    </Box>
  )
}

export default Rightbar