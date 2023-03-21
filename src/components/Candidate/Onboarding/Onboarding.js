import React, { useContext, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import DropDown from'../../common/DropDown/DropDown'
import FileUpload from '../../common/FileUpload/FileUpload'
import './Onboarding.css'
import  SearchDropDown  from '../../common/SearchDropDown/SearchDropDown'
import {skills,experience,primaryRole} from '../../../Content/index'
import {UserContext} from '../../../context/UserContext'
const CandidateOnboarding = () => {
  const [userData,dispatch]=useContext(UserContext)
  const [userInformation, setUserInformation] = useState({
    name: userData.user.displayName,
    email: userData.user.email,
    phone: "",
    location: "",
    primaryRole: "",
    skills: [],
    linkedIn: "",
    experience: "",
    bio: "",
    resume: ""
  })
  const handleSkills=(data,type)=>{
    console.log(userData);
    if(type==='delete')
    {
      let new_data=userInformation.skills.filter((skill)=>skill !== data)
      setUserInformation({...userInformation,skills:new_data});
    }
    else{

      if(userInformation.skills.find(skill=>skill===data)){}
      else{
  
        let new_data=[...userInformation.skills,data];
        setUserInformation({...userInformation,skills:new_data})
      }
    }
    
  }
  const submit=(data)=>{
    console.log(data);
  }
  return (
    <form onSubmit={e=>{submit(e)}}>

    <Grid container spacing={2} className='onboarding-container'>
      <Grid item xs={12}> <h1>ONBOARDING CANDIDATE</h1> </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Name</label>
        <TextField required id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.name}
          onChange={(e) => setUserInformation({ ...userInformation, name: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Email</label>
        <TextField disabled id='outlined-basic' variant='outlined' fullWidth
          type={"email"}
          value={userInformation.email}
          onChange={(e) => setUserInformation({ ...userInformation, email: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Phone</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.phone}
          onChange={(e) => setUserInformation({ ...userInformation, phone: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>location</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.location}
          onChange={(e) => setUserInformation({ ...userInformation, location: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Primary Role</label>
       <DropDown required={true} options={primaryRole} onChange={(data)=>setUserInformation({...userInformation,primaryRole:data})} value={userInformation.primaryRole}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>linkedIn</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.linkedIn}
          type={"url"}
          onChange={(e) => setUserInformation({ ...userInformation, linkedIn: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label required={true} className='onboarding-label'>experience</label>
        <DropDown options={experience} onChange={(data)=>setUserInformation({...userInformation,experience:data})}  value={userInformation.experience}/>
      
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>bio</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.bio}
          onChange={(e) => setUserInformation({ ...userInformation, bio: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Skills</label>
        <SearchDropDown required={true} options={skills} 
        onChange={(data)=>handleSkills(data,'add')}
        onDelete={data=>handleSkills(data,'delete')}
        values={userInformation.skills}/>
      </Grid>
      <Grid item xs={12}>
        <FileUpload
        required={true}
        fileType={'doc'}
        value={userInformation.resume}
        onUpload={(url)=>setUserInformation({...userInformation,resume:url})}
        />
      </Grid>
      <Grid item xs={12} className='submit-btn'>
        <button type='submit'>Complete Onboarding</button>
      </Grid>

    </Grid>
    </form>
  )
}

export default CandidateOnboarding
