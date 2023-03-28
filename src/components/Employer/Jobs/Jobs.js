import React,{useState} from 'react'
import Form from './Form'
import SideBar from './SideBar'
import { Grid} from '@mui/material'
import './Jobs.css'
const EmployerJobs = () => {
  const [showFormInMobile,setShowFormInMobile]=useState(false);
  const [selectedJob,setSelectedJob]=useState(null);
  const postAjob=()=>{
    setShowFormInMobile(true);
    setSelectedJob(null);
  }
  const selectAJob=(job)=>{
    setSelectedJob(job)
    setShowFormInMobile(true)
  }
  return (
    <Grid container spacing={2}>
      <Grid
      sx={{
        display:{xs:showFormInMobile?"none":"block",md:"block"},
        background:'#fff'
      
      }} item xs={12} md={3}>
      <SideBar selectedJob={selectedJob} selectAJob={selectAJob} postAjob={postAjob}/>
      </Grid>
      <Grid
      sx={{
        display:{xs:showFormInMobile?"block":"none",md:"block"}
      }}
      item xs={12} md={9}>
      <Form setShowFormInMobile={setShowFormInMobile} selectedJob={selectedJob}/>
      </Grid>
    </Grid>
  )
}

export default EmployerJobs
