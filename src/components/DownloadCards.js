import {
  Button         ,
  Box            ,
  TableContainer ,
  Table          ,
  TableHead      ,
  TableBody      ,
  TableRow       ,
  TableCell      ,
  TextField      ,
} from '@mui/material';
import Title from './Title';
import {useRef, useState} from 'react';
import DownloadIcon from '@mui/icons-material/Download';

function DownloadCards(){

  const {_, users, server} = window.web;
  const [search, setSearch] = useState('');
  const rows = (() => {
    const rows = [];
    let count = 30;
    for(let id in users){
      if(count <= 0)
        break;
      const user = users[id];
      if(!new RegExp('.*' + search + '.*', 'gi').test(user.name))
        continue;
      rows.push(
        <TableRow>
          <TableCell>
            {user.name}
          </TableCell>
          <TableCell>
            {
              user.is_student
              ? (user.grade + ' ' + user.department).toUpperCase() + '-' + user['class']
              : '-'
            }
          </TableCell>
          <TableCell>
            <Button
              sx={{minWidth:0}}
              component="a"
              href={server + 'api/user/card/' + user.id}
              download={'qr_card_' + user.id + '.png'}
              children={<DownloadIcon/>}/>
          </TableCell>
        </TableRow>
      );
      count--;
    }
    return rows;
  })();
  const searchTimeout = useRef(null);
  const onSearch = e => {
    clearTimeout(searchTimeout.current);
    clearTimeout.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };

  return (
    <>
      <Title title={_('lbl_download_cards')}/>
      <TextField
        placeholder={_('lbl_search')}
        onChange={onSearch}/>
      <TableContainer>
        <Table sx={{whitespace:'no-wrap'}}>
          <TableHead>
            <TableRow>
              <TableCell>
                {_('lbl_name')}
              </TableCell>
              <TableCell>
                {_('lbl_grade')}
              </TableCell>
              <TableCell>
                {_('lbl_download')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  /*const {_, axios, loading} = window.web;

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
  );*/
}

export default DownloadCards;