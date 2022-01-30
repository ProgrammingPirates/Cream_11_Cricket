import { Card } from "@mui/material";
import React from "react";
import { USERS } from "utils/data";
import UserCard from "./UserCard";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import SportsScoreIcon from "@mui/icons-material/Money";
import MainCard from "ui-component/cards/MainCard";

import { useTheme, styled } from "@mui/material/styles";

function LeaderBoard() {
  return (
    <div>
      <center>
        <h1>India vs England</h1>
      </center>
      <BidAmountCard bidAmount="0.1 ETH" />

      <div style={leaderboardListStyles}>
        <h1>Leaderboard</h1>
        {USERS.map((user, index) => {
          return <UserCard playerInfo={user} up={index % 2} />;
        })}
      </div>
    </div>
  );
}

export default LeaderBoard;

const leaderboardListStyles = {
  height: "30rem",
  width: "18rem",
  overflowY: "auto",
};

function BidAmountCard(props) {
  const theme = useTheme();
  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.warning.light,
                  color: theme.palette.warning.dark,
                }}
              >
                <SportsScoreIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45,
              }}
              primary={<Typography variant="h4">{props.bidAmount}</Typography>}
              secondary={
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.grey[500],
                    mt: 0.5,
                  }}
                >
                  Your bid Amount
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </CardWrapper>
  );
}

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  width: 400,
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));
