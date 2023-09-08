import {
  Backdrop         ,
  CircularProgress ,
} from '@mui/material';

function Loading({open}){
  return (
    <Backdrop sx={{zIndex:1000}} open={open}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
}

export default Loading;