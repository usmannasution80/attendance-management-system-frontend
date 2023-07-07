import {
  Grid,
  Box,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {green} from '@mui/material/colors';

export default ({onMenuClick}) => {

  const {
    _,
    isMobile
  } = window.web;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      sx={{p:1, background:green[400]}}>

      {isMobile() &&
        <Grid item>
          <Button
            onClick={onMenuClick}
            sx={{minWidth:0, p:1}}
            variant="outlined"
            color="info">
            <MenuIcon/>
          </Button>
        </Grid>
      }

      <Grid item xs>
        <Box
          component="h2"
          sx={{textAlign:'center', p:0, m:0}}
          children={_('header')}/>
      </Grid>
    </Grid>
  );
};