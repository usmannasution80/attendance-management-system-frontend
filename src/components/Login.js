import {
  Paper,
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';
import {useRef} from 'react';
import Footer from './Footer';

export default () => {

  const {
    _,
    props,
    login,
    navigate,
    alert,
    axios
  } = window.web;

  const email = useRef('');
  const password = useRef('');
  
  const loginHandler = e => {

    axios({
      url    : 'login',
      method : 'POST',
      data   : {
        email    : email.current,
        password : password.current
      }
    })
    .then(r => navigate('/'))
    .catch(e => console.log(e));
    return;

    if(login(email.current, password.current))
      navigate('/');
    else
      alert('error', _('msg_login_fail'));

  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{height:window.innerHeight + 'px'}}>

      <Grid
        item
        sx={{maxWidth:'400px'}}>

        <Paper sx={{p:1}}>

          <Box
            component="h2"
            sx={{textAlign:'center'}}>
            {_('login_header')}
          </Box>

          <Box>

            <TextField
              label={_('lbl_email')}
              onChange={e => email.current = e.target.value}/>
    
            <TextField
              label={_('lbl_password')}
              onChange={e => password.current = e.target.value}/>

            <Button
              fullWidth
              children={_('btn_login')}
              onClick={loginHandler}/>

          </Box>

          <Footer/>

        </Paper>
      </Grid>
    </Grid>
  );
}