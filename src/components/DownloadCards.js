import {
  Button ,
  Box    ,
} from '@mui/material';
import Title from './Title';

function DownloadCards(){

  const {_, axios, loading} = window.web;

  const download = e => {
    loading(true);
    axios({
      url : 'user/download-cards'
    }).then(r => {
      loading(false);
      window.open(r.data.url, '_blank');
    });
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
}

export default DownloadCards;