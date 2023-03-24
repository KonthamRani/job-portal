import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchDropDown.css'
export default function SearchDropDown({onDelete,options,onChange,values,disabled}) {
  return (
    <div>

        <Autocomplete
        required
        disabled={disabled}
          disablePortal
          id="combo-box-demo"
          options={options || []}
          onChange={(event,value)=>{onChange(value)}}
          renderInput={(params) => <TextField {...params} disabled={disabled} />}
        />
        <div className='item-container'>
            {values.map((value,index)=>{
                return <div
                disabled={disabled}
                key={index}
                onClick={()=>onDelete(value,'remove')}
                className='item-value'>{value}</div>
            })}
        </div>
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
