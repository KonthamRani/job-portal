import React from 'react'
import {TextField } from '@mui/material'
import pfgimg from '../../../assets/pfgimg.png'
const FileUpload = ({
  fileType,
  onUpload,
  value
}) => {
  return (
    <div>

    <div>
        <label className='onboarding-label'>Resume</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          type={"file"}
          />
        
    </div>
    {
      fileType==='doc'&& value?(
        <div style={{margin:'20px'}}>
          <img src={pfgimg} width='100px' alt="pfgimg"/>
        </div>
      ):fileType==='image'&& value
      (<div>Image</div>)
    }
    </div>
  )
}

export default FileUpload