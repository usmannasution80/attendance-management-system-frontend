import {SwipeableDrawer} from '@mui/material';
import Menu from './Menu';

export default ({open, onClose, onOpen}) => {
  return (
    <SwipeableDrawer
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      anchor="left"
      onClick={onClose}
      PaperProps={{sx:{p:0,m:0}}}>
      <Menu/>
    </SwipeableDrawer>
  );
};