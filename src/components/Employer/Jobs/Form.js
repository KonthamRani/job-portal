import React,{useEffect}from 'react'
import './Jobs.css'
import { useContext, useState } from 'react'
import { Grid, TextField, Button, CircularProgress } from '@mui/material'
import DropDown from '../../common/DropDown/DropDown'
import FileUpload from '../../common/FileUpload/FileUpload'
import './Jobs.css'
import SearchDropDown from '../../common/SearchDropDown/SearchDropDown'
import { jobType, skills, yearsOfExperience, salaryCurrency, industry_type, company_size } from '../../../Content/index'
import { UserContext } from '../../../context/UserContext'
import { db } from "../../../FireBaseConfig/FireBaseConfig"
import { useNavigate } from 'react-router-dom';
import toastMessage from '../../../Util/toastMessages'
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
const initialState={
  jobType: "",
  jobLocation: "",
  jobTitle: "",
  yearsOfExperience: "",
  salary: {
    min: "",
    max: "",
    currency: ""
  },
  jobDescription: "",
  skills: []
}
const Form = ({ setShowFormInMobile,selectedJob }) => {
  const [userData,dispatch]=useContext(UserContext)
  const [jobData, setJobData] = useState({
    jobType: "",
    jobLocation: "",
    jobTitle: "",
    yearsOfExperience: "",
    salary: {
      min: "",
      max: "",
      currency: ""
    },
    jobDescription: "",
    skills: []
  })
  const [loading, setLoading] = useState(false);
  const handleSkills = (data, type) => {
    console.log(jobData, "jobData");
    if (type === 'delete') {
      let new_data = jobData.skills.filter((skill) => skill !== data)
      setJobData({ ...jobData, skills: new_data });
    }
    else {

      if (jobData.skills.find(skill => skill === data)) { }
      else {

        let new_data = [...jobData.skills, data];
        setJobData({ ...jobData, skills: new_data })
      }
    }

  }
  const submit = async (e) => {
    e.preventDefault();
    console.log(jobData);
    const jobId = selectedJob?selectedJob.jobId:uuidv4();
    //posting data to firebase in jobs collection
    setLoading(true);
    try{
    await setDoc(doc(db, 'jobs', jobId), {
      ...jobData, jobId,
      createdAt: new Date().toISOString(),
      employerId: userData.user.email,
      employerName: userData.userInfo.company_name,
      company_logo:userData.userInfo.company_logo
    })
if(selectedJob){

  toastMessage("Job updated successfully","success")
}
else{
  toastMessage("Job posted successfully","success")
}
  setLoading(false);
  }
    catch(error){
      console.log(error);
      toastMessage("Something went wrong","danger")
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(selectedJob){
      setJobData({...selectedJob})
    }
    else{
      setJobData({...initialState})
    }
  },[selectedJob])
  return (
    <div>
      <Button
        onClick={() => setShowFormInMobile(false)}
        sx={{
          display: { xs: "block", md: "none" }
        }}
      >Back</Button>
      <form onSubmit={(e) => submit(e)}>

        <Grid container spacing={2} className='jobForm-container'>
          <Grid item xs={12} md={6}>
            <label className='jobForm-label'>jobTitle</label>
            <TextField required id='outlined-basic' variant='outlined' fullWidth
              value={jobData.jobTitle}
              onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })} />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className='jobForm-label'>jobLocation</label>
            <TextField id='outlined-basic' variant='outlined' fullWidth
              value={jobData.jobLocation}
              onChange={(e) => setJobData({ ...jobData, jobLocation: e.target.value })} />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className='jobForm-label'>jobType</label>
            <DropDown required={true} options={jobType} onChange={(data) => setJobData({ ...jobData, jobType: data })} value={jobData.jobType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className='jobForm-label'>yearsOfExperience</label>
            <DropDown required={true} options={yearsOfExperience} onChange={(data) => setJobData({ ...jobData, yearsOfExperience: data })} value={jobData.yearsOfExperience} />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className='jobForm-label'>Salary</label>
            <Grid container spacing={2}>
              <Grid item xs={4} >
                <DropDown required={true} options={salaryCurrency} onChange={(data) => setJobData({ ...jobData, salary: { ...jobData.salary, currency: data } })} value={jobData.salary.currency} />
              </Grid>
              <Grid item xs={4} >
                <TextField required id='outlined-basic' variant='outlined' fullWidth
                  value={jobData.salary.min}
                  onChange={(e) => setJobData({ ...jobData, salary: { ...jobData.salary, min: e.target.value } })} />
              </Grid>
              <Grid item xs={4} >

                <TextField required id='outlined-basic' variant='outlined' fullWidth
                  value={jobData.salary.max}
                  onChange={(e) => setJobData({ ...jobData, salary: { ...jobData.salary, max: e.target.value } })} />
              </Grid>
            </Grid>
          </Grid>



          <Grid item xs={12} >
            <label className='jobForm-label'>Job Description</label>
            <TextField id='outlined-basic' variant='outlined'
              multiline
              minRows={4}
              fullWidth
              value={jobData.jobDescription}
              onChange={(e) => setJobData({ ...jobData, jobDescription: e.target.value })} />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className='onboarding-label'>Skills</label>
            <SearchDropDown required={true} options={skills}
              onChange={(data) => handleSkills(data, 'add')}
              onDelete={data => handleSkills(data, 'delete')}
              values={jobData.skills} />
          </Grid>
          <Grid item xs={12} className='submit-btn'>
            {
              loading ?
                (<button type='submit'>
                  <CircularProgress />
                </button>)
                : (
                  <Button disabled={jobData.resume === ""} type="submit">Submit</Button>)
            }
          </Grid>

        </Grid>
      </form>

    </div>
  )
}

export default Form
