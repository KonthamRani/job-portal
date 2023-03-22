import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React from 'react'
import {TextField } from '@mui/material'
import pfgimg from '../../../assets/pfgimg.png'
import {storage} from '../../../FireBaseConfig/FireBaseConfig'
const FileUpload = ({
  fileType,
  onUpload,
  value
}) => {
  const upload=(e)=>{
    const file=e.target.files[0];
    console.log(file);
const storageRef = ref(storage, `${fileType}/${file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    
  },
  (error) => {
    console.log(error,'error')
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      onUpload(downloadURL);
    });
  }
);
  }
  return (
    <div>

    <div>
        <label className='onboarding-label'>Resume</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          type={"file"} onChange={e=>upload(e)}
          inputProps={{accept:fileType==='doc'?'application/pdf':'image/*'}}
          />
        
    </div>
    {
      fileType==='doc' && value
      ?
        (<div style={{margin:'20px'}}>
          <img src={pfgimg} width='100px' alt="pfgimg"/>
        </div>
      ):fileType==='image' && value
      (
      <div style={{margin:'20px'}}>
      <img src={value} width='100px' alt="pfgimg"/>
    </div>)
    }
    </div>
  )
}

export default FileUpload