import {useEffect, useRef, useState} from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button
} from '@mui/material';
import DateForm from './DateForm';
import GradeForm from './GradeForm';
import SetAttendanceStatus from './SetAttendanceStatus';
import ScannerAudioUrl from './../scanner.mp3';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

function AttendanceList(){

  const {
    _           ,
    minGrade    ,
    departments ,
    set         ,
    axios       ,
    users       ,
    zeroPadding ,
    navigate    ,
    component   ,
  } = window.web;
  const [rndr, setRender] = useState(-1);
  const render = () => setRender(rndr * -1);

  const [lastUpdate, setLastUpdate] = useState(0);

  const [fullDate, setFullDate] = useState((() => {
    const d = new Date();
    return d.getFullYear() + '-' + zeroPadding(d.getMonth() + 1, 2) + '-' + zeroPadding(d.getDate(), 2);
  })());

  const logs = component('QrLogs', 'logs');

  const audio = useRef(null);
  const queue = useRef([]);

  const fullDateRef = useRef(fullDate);
  const [year, month, date] = fullDate.split('-');

  const [type, setType] = useState('student');
  const [editId, setEditId] = useState(null);
  const [isScan, setIsScan] = useState(false);

  const isTeacher = type === 'teacher';
  const isStudent = type === 'student';

  const [fullGrade, setFullGrade] = useState({
    grade      : minGrade,
    department : Object.keys(departments)[0],
    cls        : 1
  });
  const {grade, department, cls} = fullGrade;

  const [searchName, setSearchName] = useState('');

  const setAttendanceListTimeout = useRef(null);
  const setAttendanceList = () => {
    const prevFullDate = fullDateRef.current;
    axios({url : 'attendance/list/' + fullDateRef.current + '?last_update=' + lastUpdate}).then(r => {
      if(prevFullDate === fullDateRef.current && !!r.data){

        let lastUpdateTs = Math.floor(new Date(lastUpdate).valueOf() / 1000);

        for(let data of r.data.data.split(';')){

          let [id, time, status] = data.split(',');
          time = parseInt(time); 

          if(time < lastUpdateTs)
            continue;

          if(!!users[id]){
            if(users[id].time > time)
              continue;
          }

          users[id] = Object.assign(
            users[id] || {},
            {time, status}
          );

        }

        if(new Date(r.data.updated_at) > new Date(lastUpdate))
          setLastUpdate(r.data.updated_at);

      }

      if(setAttendanceListTimeout.current)
        clearTimeout(setAttendanceListTimeout.current);

      setAttendanceListTimeout.current = setTimeout(setAttendanceList, 100);

    });
  };

  const scanButtonOnclick = e => {
    const d = new Date();
    setFullDate(
      d.getFullYear() + '-'
      + zeroPadding(d.getMonth() + 1, 2) + '-'
      + zeroPadding(d.getDate(), 2)
    );
    component('QrScannerDialog', 'open', true);
  };

  const setStatus = (id, status, qr = false) => {

    if(queue.current.indexOf(id) === -1)
      queue.current.push(id);
    else
      return;

    const prevStatus = users[id].status;
    const prevTime   = users[id].time;
    const getTime    = () => {
      let d = new Date();
      return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    };

    users[id].status = status;
    users[id].time   = Math.floor(Date.now());

    logs.add(
      getTime(),
      'black',
      _('attendance_set_ongoing', {name : users[id].name})
    );

    if(prevStatus === status){
      logs.add(
        getTime(),
        'green',
        _('attendance_set_success', {name : users[id].name, status : _(status)})
      );

      if(qr){
        audio.current.currentTime = 0;
        audio.current.play();
      }

      return;
    }

    axios({
      url     : 'attendance/set',
      method  : 'POST',
      data    : {id, status, date : fullDate},
      loading : true
    }).then(r => {

      logs.add(
        getTime(),
        'green',
        _('attendance_set_success', {name : users[id].name, status : _(status)})
      );

      if(qr) audio.current.play();

    }).catch(e => {

      users[id].status = prevStatus;
      users[id].time   = prevTime;

      logs.addLog(
        getTime(),
        'red',
        _('attendance_set_failed', {name : users[id].name})
      );

      render();

    });

  };

  useEffect(() => {
    setAttendanceList();
    if(!window.web.components.AttendanceList){
      window.web.components.AttendanceList = {
        setStatus
      };
    }
  }, []);

  useEffect(() => {

    for(let id in users)
      users[id].status = undefined;

    setLastUpdate(0);
    fullDateRef.current = fullDate;
    clearTimeout(setAttendanceListTimeout.current);
    setAttendanceList();

  }, [fullDate]);

  return (

    <>

      <Box>
        <span>{_('lbl_type')} : </span>
        <Button
          sx={{mx:1}}
          color={isTeacher ? 'primary' : 'inherit'}
          onClick={e => setType('teacher')}
          children={_('teacher')}/>
        <Button
          color={isStudent ? 'primary' : 'inherit'}
          onClick={e => setType('student')}
          children={_('student')}/>
      </Box>

      <Box sx={{my:1}}>

        <DateForm
          d={parseInt(date)}
          m={parseInt(month)}
          y={year}
          onChange={({d, m, y}) => setFullDate(y + '-' + zeroPadding(m, 2) + '-' + zeroPadding(d, 2))}/>

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
        label={_('lbl_name')}
        onChange={e => setSearchName(e.target.value)}/>


      <Box sx={{textAlign:'right'}}>
        <Button
          sx={{mb:1}}
          children={_('lbl_scan')}
          startIcon={<QrCodeScannerIcon/>}
          onClick={scanButtonOnclick}/>
      </Box>

      <TableContainer>
        <Table sx={{whitespace:'no-wrap'}}>
          <TableHead>
            <TableRow>
              <TableCell>
                {_('lbl_name')}
              </TableCell>
              {isStudent && <TableCell>
                {_('lbl_grade')}
              </TableCell>}
              <TableCell>
                {_('lbl_status')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(() => {
  
              const rows = [];
              let i = 1;
  
              for(let id in users){

                const user = users[id];

                if(!user)
                  continue;

                if(!new RegExp(searchName, 'i').test(user.name))
                  continue;

                if(user.is_student && isTeacher || user.is_teacher && isStudent)
                  continue;

                if(isStudent)
                  if(user.grade !== parseInt(grade) || user.department !== department || user['class'] !== parseInt(cls))
                    continue;

                let color;
                switch (user.status) {
                  case 'present':
                    color = 'success';
                    break;
                  case 'excuse':
                    color = 'primary';
                    break;
                  case 'sick':
                    color = 'warning';
                    break;
                  default:
                    color = 'error';
                }

                rows.push(
                  <TableRow key={id}>
                    <TableCell>
                      <Button
                        variant="text"
                        children={user.name}
                        onClick={e => navigate('/edit-person/' + user.id)}/>
                    </TableCell>
                    {isStudent && <TableCell>
                      {(user.grade + ' ' + user.department).toUpperCase()}
                    </TableCell>}
                    <TableCell>
                      <Button
                        color={color}
                        children={_(user.status || 'absent')}
                        onClick={e => setEditId(user.id)}/>
                    </TableCell>
                  </TableRow>
                );

                if(i > 50)
                  break;
                i++;

              }
              return rows;
            })()}
          </TableBody>
        </Table>
      </TableContainer>

      <SetAttendanceStatus
        open={!!editId}
        onClose={e => setEditId(null)}
        userId={editId}
        setStatus={setStatus}
        date={fullDate}/>

      <audio ref={audio} style={{display:'none'}}>
        <source src={ScannerAudioUrl}/>
      </audio>

    </>
  )
}

export default AttendanceList;