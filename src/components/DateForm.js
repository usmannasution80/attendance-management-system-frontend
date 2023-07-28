import {Grid} from '@mui/material';
import Select from './Select';

export default ({d, m, y, onChange}) => {

  const {_, zeroPadding} = window.web;

  const dateValues = (() => {
    const dateValues_ = {};
    for(let i=1;i<=31;i++){
      dateValues_[zeroPadding(i)] = zeroPadding(i);
    }
    return dateValues_;
  })();

  const monthValues = (() => {
    const monthValues_ = {};
    for(let i=1;i<=12;i++)
      monthValues_[zeroPadding(i)] = _('month_' + i);
    return monthValues_;
  })();

  const yearValues = (() => {
    const yearValues_ = {};
    for(let i=2000;i<=new Date().getFullYear();i++)
      yearValues_[String(i)] = String(i);
    return yearValues_;
  })();

  return(
    <Grid container spacing={1}>
      <Grid item xs>
        <Select
          label={_('lbl_date')}
          value={d}
          values={dateValues}
          onChange={e => onChange({d:e.target.value, m, y})}/>
      </Grid>
      <Grid item xs>
        <Select
          label={_('lbl_month')}
          value={m}
          values={monthValues}
          onChange={e => onChange({d, m:e.target.value, y})}/>
      </Grid>
      <Grid item xs>
        <Select
          label={_('lbl_year')}
          value={y}
          values={yearValues}
          onChange={e => onChange({d, m, y:e.target.value})}/>
      </Grid>
    </Grid>
  );
};