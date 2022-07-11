import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function User({ fname, lname, bio, uname, img }) {
  return (
    <List alignItems="center">
      <ListItem
        alignItems="flex-start"
        sx={{ padding: "0px 2px", margin: "0px 2px" }}
      >
        <ListItemAvatar>
          <Avatar alt={fname} src={img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              {`${fname}  ${lname} `}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                color="text.secondary"
              >
                {`@${uname}`}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {bio}
              </Typography>
              <Typography component="span" sx={{ display: "block" }}>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<PersonAddIcon />}
                >
                  Follow
                </Button>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

export default User;
