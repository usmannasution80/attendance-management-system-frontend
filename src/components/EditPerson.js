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
import DeleteUserDialog from './DeleteUserDialog';
import {useState, useRef, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

export default () => {

  const {
    _,
    minGrade,
    maxGrade,
    departments,
    axios,
    navigate,
    alert,
    users,
    axiosErrorHandling,
  } = window.web;

  const {user_id} = useParams();
  let user = null;

  if(user_id)
    user = users[user_id];

  const name = useRef('');
  const editDataFetched = useRef(false);
  const [role, setRole] = useState('');
  const [grade, setGrade] = useState('');
  const [department, setDepartment] = useState('');
  const [cls, setCls] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const email = useRef('');
  const [deleteDialog, setDeleteDialog] = useState(false);

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

    if(user)
      data.id = user.id;

    if(role === 'student')
      Object.assign(data, {grade, department, ['class']:cls});

    if(isAdmin){
      data.email    = email.current;
      data.is_admin = true;
    }

    axios({
      url    : 'user/' + (user ? 'update' : 'create'),
      method : 'POST',
      data   : data,
      loading: true
    })
    .then(r => navigate('/'))
    .catch(axiosErrorHandling);

  };

  useEffect(() => {
    if(user && !editDataFetched.current){
      editDataFetched.current = true;
      name.current = user.name;
      setRole(user.grade ? 'student' : 'teacher');
      if(user.grade){
        setGrade(user.grade);
        setDepartment(user.department);
        setCls(user['class']);
      }
      email.current = user.email || '';
      setIsAdmin(user.is_admin);
    }
  });

  if(user_id && !user)
    return <></>;

  return (
    <>

      <Title title={_('lbl_add_person')}/>

      <TextField
        label={_('lbl_name')}
        defaultValue={user ? user.name : ''}
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
        defaultValue={user ? user.email || '' : ''}
        onChange={e => email.current = e.target.value}/>

      <Box sx={{textAlign:'right',mt:1}}>

        <Button
          onClick={e => setDeleteDialog(true)}
          startIcon={<DeleteIcon/>}
          color="error"
          sx={{mx : 1, display : user ? undefined : 'none'}}
          children={_('lbl_delete_user')}/>

        <Button
          onClick={save}
          startIcon={<SaveIcon/>}
          children={_('lbl_save')}/>

      </Box>

      <DeleteUserDialog
        id={user_id}
        open={deleteDialog}
        onClose={e => setDeleteDialog(false)}/>

    </>
  );

};