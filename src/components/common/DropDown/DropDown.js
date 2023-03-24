import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './DropDown.css'
export default function DropDown({
    options,value,onChange,disabled
}) {
  const [age, setAge] = React.useState('');

 

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
        disabled={disabled}
        required={true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={(e)=>onChange(e.target.value)}
        >
            {
                options.map((opt,index)=>{
                    return <MenuItem  disabled={disabled} key={index} value={opt}>{opt}</MenuItem>
                })
            }
        </Select>
      </FormControl>
    </Box>
  );
}