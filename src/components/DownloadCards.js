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
import GradeForm from './GradeForm';
import {useRef, useState} from 'react';
import DownloadIcon from '@mui/icons-material/Download';

function DownloadCards(){

  const {_, users, server, strg, minGrade, departments, loading, axios} = window.web;
  const [search, setSearch] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const isTeacher = !isStudent;
  const [fullGrade, setFullGrade] = useState({
    grade      : minGrade,
    department : Object.keys(departments)[0],
    cls        : 1
  });
  const {grade, department, cls} = fullGrade;
  const rows = (() => {
    const rows = [];
    let count = 30;
    for(let id in users){
      if(count <= 0)
        break;
      const user = users[id];

      if(!new RegExp('.*' + search + '.*', 'gi').test(user.name))
        continue;

      if(user.is_student && isTeacher || user.is_teacher && isStudent)
        continue;

      if(isStudent)
        if(user.grade !== parseInt(grade) || user.department !== department || user['class'] !== parseInt(cls))
          continue;

      rows.push(
        <TableRow key={String(count)}>
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
  const downloadAll = () => {
    loading(true);
    window.location.href = `${server}api/user/download-cards?grade=${grade}&department=${department}&class=${cls}&name=${search}`;
  }

  return (
    <>
      {strg('is_login') &&
        <Title title={_('lbl_download_cards')}/>
      }
      <Box sx={{mb:1}}>
        <span>{_('lbl_type')} : </span>
        <Button
          sx={{mx:1}}
          color={isTeacher ? 'primary' : 'inherit'}
          onClick={e => setIsStudent(false)}
          children={_('teacher')}/>
        <Button
          color={isStudent ? 'primary' : 'inherit'}
          onClick={e => setIsStudent(true)}
          children={_('student')}/>
      </Box>
      {isStudent &&
        <Box sx={{mb:1}}>
          <GradeForm
            grade={grade}
            department={department}
            cls={cls}
            onChange={({grade, department, cls}) => setFullGrade({grade, department, cls})}/>
        </Box>
      }
      <TextField
        placeholder={_('lbl_search')}
        onChange={onSearch}/>
      <Button
        onClick={downloadAll}
        children={_('lbl_download_all')}
        sx={{width:'100%'}}/>
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
}

export default DownloadCards;