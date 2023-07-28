import {
  Button ,
  Box    ,
} from '@mui/material';
import Title from './Title';

export default () => {

  const {_, axios} = window.web;

  const download = e => {
    axios({
      url     : 'user/download-cards',
      loading : true,
    }).then(r => window.open(r.data.url, '_blank'));
  };

  return (
    <>
      <Box>
        <Title title={_('lbl_download_cards')}/>
        <Button
          sx={{display:'block', mx:'auto'}}
          onClick={download}>
          {_('lbl_download')}
        </Button>
      </Box>
    </>
  );
};