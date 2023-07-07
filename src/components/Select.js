import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

export default (props) => {

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
          for(let val in values){
            items.push(
              <MenuItem value={val}>
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