import {useEffect} from 'react';
import {Grid} from '@mui/material';
import Select from './Select';

function GradeForm({grade, department, cls, onChange}){

  const {
    minGrade,
    maxGrade,
    departments,
    _
  } = window.web;

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

  useEffect(() => {
    if(cls > departments[department])
      onChange({grade, department, cls:departments[department]});
  }, [department]);

  return (
    <Grid
      container
      spacing={1}>

      <Grid item xs>
        <Select
          label={_('lbl_grade')}
          value={grade}
          onChange={e => onChange({grade:e.target.value, department, cls})}
          values={grades}/>
      </Grid>

      <Grid item xs={6}>
        <Select
          label={_('lbl_department')}
          value={department}
          onChange={e => onChange({grade, department:e.target.value, cls})}
          values={departments_}/>
      </Grid>

      <Grid item xs>
        <Select
          label={_('lbl_class')}
          value={cls}
          onChange={e => onChange({grade, department, cls:e.target.value})}
          values={classes}/>
      </Grid>

    </Grid>
  );
}

export default GradeForm;