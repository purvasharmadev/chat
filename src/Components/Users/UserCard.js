import React, { useState } from "react";
import { Stack, Badge, Avatar, Box, IconButton, Input, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { getDataFromLocal } from "../../Hooks/useLocalStorage";
import { editUser } from "../../Features/user-slice";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
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
  const uname = getDataFromLocal("user", '');
  const [editProfile, setEditProfile] = useState({
    firstName: firstName,
    lastName: lastName,
    bio: bio,
    url:url,
    dp:dp,
  });
  const [edit, setEdit] = useState(false);

  console.log("editProfile ", editProfile)

  const editHandler = () => {
    dispatch(
      editUser({
        data: editProfile,
        token: getDataFromLocal("token", "token"),
      })
    );
    setEdit(false);
  };

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

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
              // <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  onChange={(e) => {
                    setEditProfile((prev) => ({
                      ...prev,
                      dp: e.target.files[0].name,
                    }));
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
            }
          >
            <img
              src={dp}
              alt={username}
              className="img-responsive img-rounded"
              height="300px"
              width="300px"
            />
          </Badge>

          {/* <img
            src={dp}
            alt={username}
            className="img-responsive img-rounded"
            height="300px"
            width="300px"
          /> */}
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
            {
              edit ? <Input
              onChange={(e) => {
                setEditProfile((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))}}
               value={editProfile.url}/> :    
              <a className="color-primary pr-1 pl-1" href={url}>
              {url}
            </a>
            }

            <CalendarMonthIcon className="pr-0" /> joined at : {createdAt}
          </p>
        </Box>
      </Stack>
    </>
  );
}

export default UserCard;
