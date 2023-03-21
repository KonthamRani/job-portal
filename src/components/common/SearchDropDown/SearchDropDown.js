import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchDropDown.css'
export default function SearchDropDown({onDelete,options,onChange,values}) {
  return (
    <div>

        <Autocomplete
        required
          disablePortal
          id="combo-box-demo"
          options={options || []}
          onChange={(event,value)=>{onChange(value)}}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <div className='item-container'>
            {values.map((value)=>{
                return <div
                onClick={()=>onDelete(value,'remove')}
                className='item-value'>{value}</div>
            })}
        </div>
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
