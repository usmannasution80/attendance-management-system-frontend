import {Box} from '@mui/material';

function Title({title}){
  return (
    <Box
      children={title}
      component="h3"
      sx={{textAlign:'center',p:1.5,m:0}}/>
  );
}

export default Title;