import {
  Paper,
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';
import {useRef, useState} from 'react';
import Footer from './Footer';
import DownloadCards from './DownloadCards';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function Login(){

  const {
    _,
    props,
    login,
    strg,
    navigate,
    alert,
    axios,
    loading,
    axiosErrorHandling
  } = window.web;

  const email    = useRef('');
  const password = useRef('');
  const [isDownloadCard, setIsDownloadCard] = useState(false);
  
  const loginHandler = e => {

    loading(true);

    axios({
      url    : 'login',
      method : 'POST',
      data   : {
        email    : email.current,
        password : password.current
      }
    })
    .then(r => {
      strg('is_login', true);
      loading(false);
    })
    .catch(axiosErrorHandling);
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

          {isDownloadCard &&
            <>
              <Box>
                <Button
                  onClick={e => setIsDownloadCard(false)}
                  variant="text"
                  startIcon={<KeyboardBackspaceIcon/>}
                  children={_('lbl_back_to_login')}/>
              </Box>
              <DownloadCards/>
            </>
          }

          {!isDownloadCard &&
            <>
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
                  type="password"
                  onChange={e => password.current = e.target.value}/>
    
                <Button
                  fullWidth
                  children={_('btn_login')}
                  onClick={loginHandler}/>
    
                <Button
                  fullWidth
                  children={_('lbl_download_cards')}
                  variant="text"
                  onClick={e => setIsDownloadCard(true)}/>
    
              </Box>
            </>
          }
    
          <Footer/>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;