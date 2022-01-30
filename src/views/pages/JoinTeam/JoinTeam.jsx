import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MATCHES } from "utils/data";
import TeamList from "./TeamList";
import PlayerCard from "./PlayerCard";
import { Grid, Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import TotalPoints from "./TotalPoints";
import useUserContract from "hooks/useUserContract";

function JoinTeam(props) {
  const navigate = useNavigate();

  //mid
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shouldShowCreateTeam, setShouldShowCreateTeam] = useState(false);
  const [remainingPoints, setRemainingPoints] = useState(100);
  const [scoreError, setScoreError] = useState(false);
  const params = useParams();
  const { createTeam, initContract } = useUserContract();
  useEffect(() => {
    MATCHES.forEach((match) => {
      if (match.match_id === params.mId) {
        setMatchInfo(match);
        setLoading(false);
      }
    });
  }, []);

  const [selectedTeam, setSelectedTeam] = useState([]);
  useEffect(() => {
    if (selectedTeam.length === 11) {
      setShouldShowCreateTeam(true);
    } else {
      setShouldShowCreateTeam(false);
    }

    if (selectedTeam.length >= 11) {
      setError("Team length can be max 11");
    }
    if (remainingPoints <= 0) {
      setError("Not enough points available");
    } else {
      setError(false);
    }
  }, [selectedTeam, remainingPoints]);

  async function handleCreateTeam() {
    const instance = await initContract();
    // build 2darray
    let array = [];
    selectedTeam.forEach((player) => {
      array.push([
        player.playerType,
        `${player.pointRequired}`,
        player.playerId,
        "0",
        "0",
      ]);
    });
    array[0][3] = "1";
    array[1][4] = "1";
    await instance.createTeam(
      "0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435",
      "2",
      array,
      {
        from: "0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435",
        value: 100000000000000000,
      }
    );

    navigate("/leaderboard/match_1");
  }

  function selectPlayer(playerInfo) {
    setSelectedTeam([...selectedTeam, playerInfo]);
    var totalscore = remainingPoints - playerInfo.pointRequired;
    if (totalscore <= 0) return;
    setRemainingPoints(totalscore);
  }

  function removePlayer(playerInfo) {
    var totalscore = remainingPoints + playerInfo.pointRequired;

    setRemainingPoints(totalscore);

    setSelectedTeam(
      selectedTeam.filter((player) => {
        if (player.playerId === playerInfo.playerId) return false;
        return true;
      })
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} sx={{ my: 2 }}>
          <TotalPoints score={remainingPoints} />
        </Grid>
        <Grid item xs={12} lg={4} sx={{ my: 2 }}>
          {!!scoreError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong> {scoreError} </strong>
            </Alert>
          )}
        </Grid>
        <Grid item align="center" xs={12} lg={4} sx={{ my: 2 }}>
          {shouldShowCreateTeam ? (
            <Button
              color="primary"
              variant="outlined"
              onClick={handleCreateTeam}
            >
              Create Team
            </Button>
          ) : (
            <Alert severity="info">
              {" "}
              <AlertTitle>Please Select 11 Players</AlertTitle>{" "}
              <strong>{selectedTeam.length} Players Selected</strong>{" "}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          {/* show teamA list */}
          {!loading && (
            <TeamList
              displayPicture={matchInfo?.teamA.displayPicture}
              teamName={matchInfo?.teamA.teamName}
              players={matchInfo?.teamA.players}
              onSelectPlayer={selectPlayer}
              removePlayer={removePlayer}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h2" align="center" gutterBottom>
            Your Team
          </Typography>
          <div style={{ height: "34rem", width: "auto", overflowY: "auto" }}>
            {selectedTeam.length > 0 &&
              selectedTeam.map((player) => {
                return (
                  <PlayerCard
                    playerInfo={player}
                    teamDetails={selectedTeam}
                    setTeam={setSelectedTeam}
                  />
                );
              })}
          </div>
        </Grid>

        <Grid item xs={12} lg={4}>
          {!loading && (
            <TeamList
              teamName={matchInfo?.teamB.teamName}
              players={matchInfo?.teamB.players}
              removePlayer={removePlayer}
              onSelectPlayer={selectPlayer}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default JoinTeam;
