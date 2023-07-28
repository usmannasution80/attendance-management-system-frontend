import {
  Grid,
  Box,
  Button,
  Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useRef} from 'react';

export default ({onMenuClick}) => {

  const {
    _,
    isMobile
  } = window.web;

  const headerStyle = {

    position : 'fixed',
    top      : 0      ,
    left     : 0      ,
    width    : '100%' ,
    zIndex   : 1      ,

  };

  return (
    <div
      ref={ref => document.body.style.paddingTop = ref ? ref.offsetHeight + 'px' : 0}
      style={headerStyle}>
    <Paper sx={{m:1, mb:0}}>
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      sx={{p:1}}>

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
    </Paper>
    </div>
  );
};