import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Button,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import Select from './Select';
import Title from './Title';
import {useState, useRef} from 'react';

import SaveIcon from '@mui/icons-material/Save';

export default () => {

  const {
    _,
    minGrade,
    maxGrade,
    departments
  } = window.web;

  const name = useRef('');
  const [role, setRole] = useState('');
  const [grade, setGrade] = useState('');
  const [department, setDepartment] = useState('');
  const [cls, setCls] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const email = useRef('');

  const grades = (() => {
    const grds = {};
    for(let i=minGrade;i<=maxGrade;i++)
      grds[i] = i;
    return grds;
  })();

  const departments_ = (() => {
    const dprtmnts = {};
    for(let dprtmnt in departments)
      dprtmnts[dprtmnt] = _(dprtmnt);
    return dprtmnts;
  })();

  const classes = (() => {
    const cls = {};
    const max = departments[department] || 3;
    for(let i=1;i<=max;i++)
      cls[i] = i;
    return cls;
  })();

  const save = () => {
    const data = {
      name : name.current,
      role : role
    };
    if(role === 'student')
      Object.assign(data, {grade, department, ['class']:cls});
    if(isAdmin)
      data.email = email.current;
    alert(JSON.stringify(data))
  };

  return (
    <>

      <Title title={_('lbl_add_person')}/>

      <TextField
        label={_('lbl_name')}
        onChange={e => name.current = e.target.value}/>

      <Select
        label={_('lbl_role')}
        value={role}
        onChange={e => setRole(e.target.value)}
        values={{'teacher':_('teacher'), 'student':_('student')}}/>

      {role === 'student' &&
        <Grid
          container
          sx={{my:1}}
          spacing={1}>

          <Grid item xs>
            <Select
              label={_('lbl_grade')}
              value={grade}
              onChange={e => setGrade(e.target.value)}
              values={grades}/>
          </Grid>

          <Grid item xs={6}>
            <Select
              label={_('lbl_department')}
              value={department}
              onChange={e => setDepartment(e.target.value)}
              values={departments_}/>
          </Grid>

          <Grid item xs>
            <Select
              label={_('lbl_class')}
              value={cls}
              onChange={e => setCls(e.target.value)}
              values={classes}/>
          </Grid>

        </Grid>
      }

      <FormControlLabel
        control={<Checkbox onChange={e => setIsAdmin(e.target.checked)}/>}
        label={_('lbl_admin')}/>

      <TextField
        label={_('lbl_email')}
        sx={{display : isAdmin ? undefined : 'none'}}
        onChange={e => email.current = e.target.value}/>

      <Box sx={{textAlign:'right',mt:1}}>
        <Button onClick={save}>
          <SaveIcon/>
          {_('lbl_save')}
        </Button>
      </Box>

    </>
  );

};