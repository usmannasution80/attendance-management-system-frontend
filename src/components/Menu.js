import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';
import LanguageIcon from '@mui/icons-material/Language';

function Menu(){

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

      <ListItemButton onClick={e => navigate('/download-cards')}>
        <ListItemIcon>
          <DownloadIcon/>
        </ListItemIcon>
        <ListItemText>
          {_('lbl_download_cards')}
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

      <ListItemButton onClick={e => navigate('/change-language')}>
        <ListItemIcon>
          <LanguageIcon/>
        </ListItemIcon>
        <ListItemText>
          {_('lbl_change_language')}
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

export default Menu;