import {
  Backdrop         ,
  CircularProgress ,
} from '@mui/material';

export default ({open}) => {
  return (
    <Backdrop sx={{zIndex:1000}} open={open}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};