// material-ui
import { Typography, Chip, Grid , Button, Avatar} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";

import { MATCHES } from "../../utils/data";

import { Link } from "react-router-dom";

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardPage = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Upcoming Matches
    </Typography>
    {MATCHES.map((match, index) => {
      return (
        <MainCard title="ICC Cricket World Cup">
          <Grid container spacing={2} sx={{mb:2}}>
            <Grid align="center" item xs={12} lg={5} >
            <Avatar src={match.teamA.team_dp} sx={{ width: 56, height: 56 }} />
              <Typography variant="h4">{match.teamA.teamName}</Typography>
            </Grid>
            <Grid align="center" item xs={12} lg={2}>
            <Typography variant="h1"> vs </Typography>
            </Grid>
            <Grid align="center" item xs={12} lg={5}>
            <Avatar  src={match.teamB.team_dp} sx={{ width: 56, height: 56 }} />
              <Typography variant="h4">{match.teamB.teamName}</Typography>
              </Grid>
            <Grid align="left" item xs={12} lg={4}>
          <Link style={{textDecoration:"none"}} to={`/joinMatch/${match.match_id}`}>
          <Button variant="contained" color="primary" >
          Join
          </Button>
          </Link>
          </Grid>
            <Grid align="center" item xs={12} lg={4}>
              <Chip color="success" label={`Entry Fee - ${match.matchType.entryFee} ETH`} />
            </Grid>
              <Grid align="center" item xs={12} lg={4}>
              <Chip color="error" label={`Prize Pool - ${match.matchType.prize} ETH`} />
            </Grid>
          </Grid>
        </MainCard>
      );
    })}
  </div>
);

export default DashboardPage;
