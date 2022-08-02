import React,{useEffect} from 'react';
import {useParams} from "react-router-dom";
import { getUserById, getUser } from '../Features/user-slice';
import {useSelector,useDispatch} from "react-redux"
import UserCard from "../Components/Users/UserCard";
import {Box} from "@mui/material";
import {toast} from 'react-toastify';

function Profile() {
  const {id} = useParams()
  const {userInfo,userError} = useSelector(getUser)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getUserById(id))
      // eslint-disable-next-line
    },[id])
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
      {
        userInfo.length !== 0 ?
        <UserCard
      username={userInfo.username}
      dp={userInfo.dp}
      url={userInfo.url}
      followers={userInfo.followers}
      following={userInfo.following}
      firstName={userInfo.firstName}
      lastName={userInfo.lastName}
      createdAt={userInfo.createdAt.split('T')[0]}
      bio={userInfo.bio}
        />
        :""
      }
    </Box>
  )
}

export default Profile