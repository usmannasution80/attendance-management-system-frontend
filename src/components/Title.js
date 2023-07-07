import {Box} from '@mui/material';

export default ({title}) => {
  return (
    <Box
      children={title}
      component="h3"
      sx={{textAlign:'center',p:1.5,m:0}}/>
  );
};