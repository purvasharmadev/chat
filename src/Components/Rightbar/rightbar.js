import React,{useEffect} from 'react';
import {Box} from "@mui/material"
import User from "../Users/user"
import {getUser,users} from "../../Features/user-slice"
import {useSelector,useDispatch} from "react-redux";
import {getDataFromLocal} from "../../Hooks/useLocalStorage";
import {toast} from "react-toastify"

function Rightbar() {
  const {user, userError,userStatus} = useSelector(getUser)
  const currUser = getDataFromLocal('user',[])
  const filteredList = user.filter((i)=>i._id !== currUser._id )
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(users())
    //eslint-disable-next-line
  },[])
  useEffect(() => {
    if (userError === undefined) {
      toast.error("something went wrong!! try again later", {
        toastId: "user-error-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error(userError, {
        toastId: "user-error-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }, [userError]);
  return (
    <Box flex={2} sx={{display:{xs:"none",sm:"block"}}}>
      <Box position="fixed" color={"text.primary"}>
      <h4 className="text-left pl-1 mb-0 color-primary">Who to follow</h4>
        {user &&
          filteredList.map((item,index)=>{
            return(
              <User key={index} id={item._id} img={item.dp} fname={item.firstName} lname={item.lastName} bio={item.bio} uname={item.username}/>
            )
          })}
      </Box>
    </Box>
  )
}

export default Rightbar