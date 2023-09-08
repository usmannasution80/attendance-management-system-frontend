import {
  Grid,
  Paper
} from '@mui/material';
import Menu from './Menu';
import MyRoutes from './MyRoutes';

function Main(){

  const {
    isMobile
  } = window.web;

  return (
    <Grid container>

      {!isMobile() &&
        <Grid item>
          <Paper>
            <Menu/>
          </Paper>
        </Grid>
      }

      <Grid item xs>
        <Paper>
          <MyRoutes/>
        </Paper>
      </Grid>

    </Grid>
  );
}

export default Main;