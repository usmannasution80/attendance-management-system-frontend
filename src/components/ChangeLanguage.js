import Title from './Title';
import {
  List,
  ListItemButton,
  ListItemText
} from '@mui/material';

export default () => {

  const {
    _,
    Cookie
  } = window.web;

  const languages = {
    'id' : 'Bahasa Indonesia',
    'en' : 'English',
  };

  return (
    <>
      <Title title={_('lbl_change_language')}/>
      <List>
        {(() => {
          const els = [];
          for(let lang in languages){
            els.push(
              <ListItemButton
                onClick={e => Cookie.set('lang', lang)}
                selected={Cookie.get('lang') === lang}>
                <ListItemText>
                  {languages[lang]}
                </ListItemText>
              </ListItemButton>
            );
          }
          return els;
        })()}
      </List>
    </>
  );
};