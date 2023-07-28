import {
  Alert,
  AlertTitle,
  Snackbar
} from '@mui/material';

export default () => {

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