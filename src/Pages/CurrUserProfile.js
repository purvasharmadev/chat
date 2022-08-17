import React from 'react';
import UserCard from "../Components/Users/UserCard";
import {Box} from "@mui/material";
import {getDataFromLocal} from '../Hooks/useLocalStorage'

function UserProfile() {
    const currUser = getDataFromLocal('user',{})
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