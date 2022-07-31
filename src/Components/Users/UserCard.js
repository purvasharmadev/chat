import React, { useState } from "react";
import {
  Stack,
  Badge,
  Box,
  IconButton,
  Input,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { getDataFromLocal } from "../../Hooks/useLocalStorage";
import { editUser } from "../../Features/user-slice";
import { useDispatch } from "react-redux";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function UserCard({
  username,
  dp,
  bio,
  firstName,
  lastName,
  createdAt,
  followers,
  following,
  url,
}) {
  const dispatch = useDispatch();
  const uname = getDataFromLocal("user", "");
  const [editProfile, setEditProfile] = useState({
    firstName: uname.firstName,
    lastName: uname.lastName,
    bio: uname.bio,
    url: uname.url,
    dp: uname.dp,
  });
  const [edit, setEdit] = useState(false);


  const editHandler = () => {
    dispatch(
      editUser({
        data: editProfile,
        token: getDataFromLocal("token", "token"),
      })
    );
    setEdit(false);
  };

  const imageUpload = (file) => {
    setEditProfile((prev) => ({
      ...prev,
      dp: file,
    }));
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
        m={2}
      >
        <Box>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              edit ? (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    onChange={(e) => {
                      imageUpload(URL.createObjectURL(e.target.files[0]));
                    }}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  <CameraAltIcon
                    sx={{
                      width: 32,
                      height: 32,
                      border: "2px solid gray",
                      color: "gray",
                      background: "lightgray",
                    }}
                    className="img-rounded"
                  />{" "}
                </IconButton>
              ) : (
                ""
              )
            }
          >
            <img
              src={edit ? editProfile.dp : dp}
              alt={username}
              className="img-rounded"
              height="300px"
              width="300px"
            />
          </Badge>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box>
              {edit ? (
                <Stack direction="row" spacing={2}>
                  <Input
                    onChange={(e) => {
                      setEditProfile((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                    }}
                    value={editProfile.firstName}
                  />
                  <Input
                    onChange={(e) => {
                      setEditProfile((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }));
                    }}
                    value={editProfile.lastName}
                  />
                </Stack>
              ) : (
                <>
                  <h2 className="mb-0">
                    {firstName} {lastName}
                  </h2>
                </>
              )}
              <span>@{username}</span>
            </Box>
            <Box>
              {uname.username === username ? (
                <IconButton
                  onClick={() => setEdit(!edit)}
                  aria-label="Edit"
                  size="large"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              ) : (
                ""
              )}
            </Box>
            {edit && <Button onClick={editHandler}> Save Changes</Button>}
          </Stack>

          {edit ? (
            <Input
              onChange={(e) => {
                setEditProfile((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
              value={editProfile.bio}
            />
          ) : (
            <p>{bio}</p>
          )}

          <Stack direction="row" spacing={2} alignItems="center">
            <h4>Followers: {followers.length}</h4>
            <h4>Following: {following.length}</h4>
          </Stack>
          <p className="flex align-items-center flex-space-between">
            <LinkIcon />{" "}
            {edit ? (
              <Input
                onChange={(e) => {
                  setEditProfile((prev) => ({
                    ...prev,
                    url: e.target.value,
                  }));
                }}
                value={editProfile.url}
              />
            ) : (
              <a className="color-primary pr-1 pl-1" href={url}>
                {url}
              </a>
            )}
            <CalendarMonthIcon className="pr-0" /> joined at : {createdAt}
          </p>
        </Box>
      </Stack>
    </>
  );
}

export default UserCard;
