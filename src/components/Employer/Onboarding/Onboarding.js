import React, { useContext, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import DropDown from'../../common/DropDown/DropDown'
import FileUpload from '../../common/FileUpload/FileUpload'
import './Onboarding.css'
import  SearchDropDown  from '../../common/SearchDropDown/SearchDropDown'
import {skills,experience,primaryRole,industry_type,company_size} from '../../../Content/index'
import {UserContext} from '../../../context/UserContext'
const EmployerOnboarding = () => {
  const [userData,dispatch]=useContext(UserContext)
  const [userInformation, setUserInformation] = useState({
    name: userData.user.displayName,
    employer_email: userData.user.email,
    phone: "",
    location: "",
    industry_type: "",
    company_size:"",
    role:"",
    website:"",
    company_name:"",
    company_tag:"",
    company_bio:"",
    company_logo:""
   
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
      <Grid item xs={12}> <h1>ONBOARDING EMPLOYER</h1> </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Company Name</label>
        <TextField required id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.company_name}
          onChange={(e) => setUserInformation({ ...userInformation, company_name: e.target.value })} />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Phone</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.phone}
          onChange={(e) => setUserInformation({ ...userInformation, phone: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Industry Type</label>
       <DropDown required={true} options={industry_type} onChange={(data)=>setUserInformation({...userInformation,industry_type:data})} value={userInformation.industry_type}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Company Size</label>
       <DropDown required={true} options={company_size} onChange={(data)=>setUserInformation({...userInformation,company_size:data})} value={userInformation.company_size}/>
      </Grid>
       <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Email</label>
        <TextField disabled id='outlined-basic' variant='outlined' fullWidth
          type={"email"}
          value={userInformation.employer_email}
          onChange={(e) => setUserInformation({ ...userInformation, employer_email: e.target.value })} />
      </Grid> 
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'> Name</label>
        <TextField required id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.name}
          onChange={(e) => setUserInformation({ ...userInformation, name: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'> Role</label>
        <TextField required id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.role}
          onChange={(e) => setUserInformation({ ...userInformation, role: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'> location</label>
        <TextField required id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.location}
          onChange={(e) => setUserInformation({ ...userInformation, location: e.target.value })} />
      </Grid>
    
      
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>website</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.website}
          type={"url"}
          onChange={(e) => setUserInformation({ ...userInformation, website  : e.target.value })} />
      </Grid>
     
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Company Tagline</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.company_tag}
          onChange={(e) => setUserInformation({ ...userInformation, company_tag: e.target.value })} />
      </Grid>
      <Grid item xs={12} >
        <label className='onboarding-label'>Bio</label>
        <TextField id='outlined-basic' variant='outlined'
        multiline
        minRows={4}
        fullWidth
          value={userInformation.company_bio}
          onChange={(e) => setUserInformation({ ...userInformation, company_bio: e.target.value })} />
      </Grid>
      
      <Grid item xs={12}>
        <FileUpload
        required={true}
        fileType={'image'}
        value={'userInformation.company_logo'}
        onUpload={(url)=>setUserInformation({...userInformation,company_logo:url})}
        />
      </Grid>
      <Grid item xs={12} className='submit-btn'>
        <button type='submit'>Complete Onboarding</button>
      </Grid>

    </Grid>
    </form>
  )
}

export default EmployerOnboarding
