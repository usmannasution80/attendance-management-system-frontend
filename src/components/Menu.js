import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';

export default () => {

  const {
    _,
    navigate,
    logout
  } = window.web;

  return (
    <List sx={{minWidth:'200px'}}>

      <ListItemButton onClick={e => navigate('/')}>
        <ListItemIcon>
          <ListAltIcon/>
        </ListItemIcon>
        <ListItemText>
          {_('lbl_attendance_list')}
        </ListItemText>
      </ListItemButton>

      <ListItemButton onClick={e => navigate('/add-person')}>
        <ListItemIcon>
          <PersonAddAlt1Icon/>
        </ListItemIcon>
        <ListItemText>
          {_('lbl_add_person')}
        </ListItemText>
      </ListItemButton>

      <ListItemButton onClick={logout}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText>
          {_('lbl_logout')}
        </ListItemText>
      </ListItemButton>

    </List>
  );
}