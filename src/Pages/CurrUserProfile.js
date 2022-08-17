import React,{useEffect,useState} from 'react';
import UserCard from "../Components/Users/UserCard";
import {Box} from "@mui/material";
import {getDataFromLocal} from '../Hooks/useLocalStorage';
import { getUserById, getUser } from '../Features/user-slice';
import {useSelector,useDispatch} from "react-redux";
import {toast} from 'react-toastify';



function UserProfile() {
    const user = getDataFromLocal('user',{})
    const {userInfo,userError} = useSelector(getUser)
    const dispatch = useDispatch()
    const [currUser,setCurrUser] = useState(userInfo)

    useEffect(()=>{
      dispatch(getUserById(user._id))
      setCurrUser(userInfo)
      // eslint-disable-next-line
    },[userInfo])
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
    <Box flex={6} className="h-100" color="text.primary">
        <UserCard
      username={currUser.username}
      dp={currUser.dp}
      url={currUser.url}
      followers={currUser.followers}
      following={currUser.following}
      firstName={currUser.firstName}
      lastName={currUser.lastName}
      createdAt={currUser.createdAt.split('T')[0]}
      bio={currUser.bio}
        />
    </Box>
  )
}

export default UserProfile