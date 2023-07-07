import {useEffect} from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@mui/material';

export default () => {

  const {
    _,
    attendanceList,
    departments,
    set
  } = window.web;

  useEffect(() => {
    if(!attendanceList){
      const arr = [];
      for(let i=1;i<=300;i++){
        arr.push({
          name       : 'User ' + i,
          department : departments[Math.floor(i / 100)],
          grade      : Math.floor(i / 100) + 10,
        });
      }
      set('attendanceList', arr);
    }
  }, []);

  if(!attendanceList){
    return <></>;
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {_('lbl_name')}
            </TableCell>
            <TableCell>
              {_('lbl_grade')}
            </TableCell>
            <TableCell>
              {_('lbl_status')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(() => {
            const rows = [];
            for(let person of attendanceList){
              rows.push(
                <TableRow>
                  <TableCell>
                    {person.name}
                  </TableCell>
                  <TableCell>
                    {person.grade + ' ' + person.department}
                  </TableCell>
                  <TableCell>
                    Hadir
                  </TableCell>
                </TableRow>
              );
            }
            return rows;
          })()}
        </TableBody>
      </Table>
      <Button onClick={e => window.web.logout()}>
        logout
      </Button>
    </>
  )
}