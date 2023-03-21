import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './DropDown.css'
export default function DropDown({
    options,value,onChange
}) {
  const [age, setAge] = React.useState('');

 

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
        required={true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={(e)=>onChange(e.target.value)}
        >
            {
                options.map(opt=>{
                    return <MenuItem value={opt}>{opt}</MenuItem>
                })
            }
        </Select>
      </FormControl>
    </Box>
  );
}