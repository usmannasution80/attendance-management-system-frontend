import {
  Grid,
  Paper
} from '@mui/material';
import Menu from './Menu';
import MyRoutes from './MyRoutes';

export default () => {

  const {
    isMobile
  } = window.web;

  return (
    <Grid container>

      {!isMobile() &&
        <Grid item sx={{}}>
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