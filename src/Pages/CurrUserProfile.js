import React,{useEffect,useState} from 'react';
import UserCard from "../Components/Users/UserCard";
import {Box} from "@mui/material";
import {getDataFromLocal} from '../Hooks/useLocalStorage';
import { getUserById, getUser } from '../Features/user-slice';
import {useSelector,useDispatch} from "react-redux";



function UserProfile() {
    const user = getDataFromLocal('user',{})
    const {userInfo} = useSelector(getUser)
    const dispatch = useDispatch()
    const [currUser,setCurrUser] = useState(userInfo)

    useEffect(()=>{
      dispatch(getUserById(user._id))
      setCurrUser(userInfo)
      // eslint-disable-next-line
    },[userInfo])
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