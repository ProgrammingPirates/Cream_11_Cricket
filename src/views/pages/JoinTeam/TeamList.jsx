import PlayerCard from "./PlayerCard";
import {Typography} from "@mui/material"

function TeamList(props) {
  const { players, onSelectPlayer, teamName, displayPicture, removePlayer } =
    props;
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>{teamName}</Typography>
      <div style={ListContainerStyle}>
        {players?.map((player) => {
          return (
            <PlayerCard
              playerInfo={player}
              removePlayer={removePlayer}
              onSelectPlayer={onSelectPlayer}
            />
          );
        })}
      </div>
    </>
  );
}
export default TeamList;

const ListContainerStyle = {
  height: "34rem",
  width: "auto",
  overflowY: "auto",
};
