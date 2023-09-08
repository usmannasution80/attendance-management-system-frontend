import {
  Box,
  Button
} from '@mui/material';

function Footer(){
  return (
    <Box sx={{textAlign:'center', py:3}}>
      <span>&copy; 2023-{new Date().getFullYear() + 5}</span>
      <Button
        component="a"
        variant="text"
        children="Usman Nasution"
        color="inherit"
        target="_blank"
        href="https://www.facebook.com/usman.h.nasution"/>
    </Box>
  );
}

export default Footer;