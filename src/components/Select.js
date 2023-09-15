import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function MySelect(props){

  const {
    label,
    onChange,
    values,
    value
  } = props;

  return (
    <FormControl>
      <InputLabel>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}>
        {(() => {
          const items = [];
          let i = 0;
          for(let val in values){
            items.push(
              <MenuItem key={String(i++)} value={val}>
                {values[val]}
              </MenuItem>
            );
          }
          return items;
        })()}
      </Select>
    </FormControl>
  );

}

export default MySelect;