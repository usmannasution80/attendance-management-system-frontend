import {
  Alert,
  AlertTitle,
  Snackbar
} from '@mui/material';

function MyAlert(){

  const {
    open,
    severity,
    title,
    message
  } = window.web.alertProps;

  return (
    <Snackbar
      open={!!open}
      onClose={e => window.web.set('alertProps', {})}>
      <Alert
        severity={severity}
        sx={{width:'100%'}}
        onClose={e => window.web.set('alertProps', {})}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
}

export default MyAlert;