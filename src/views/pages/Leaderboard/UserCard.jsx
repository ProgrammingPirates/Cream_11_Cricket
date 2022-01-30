import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  Button,
  CardContent,
  Chip,
} from "@mui/material";


function UserCard(props) {
  const { playerInfo, up } = props;
  return (
    <Card sx={{ maxWidth: 345, my: 1, mx: 0 }}>
      <CardHeader
        avatar={<Avatar src={playerInfo.displayPicture} aria-label="Player" />}
        title={playerInfo.userName}
        subheader={playerInfo.playerType}
      />

      <Chip
        size="small"
        color={up ? "success" : "error"}
        label={`${up ? "earned 10 points" : "lost 10 points"}`}
        sx={{ ml: 9, mb: 1 }}
      />

      <Divider />
    </Card>
  );
}

export default UserCard;
