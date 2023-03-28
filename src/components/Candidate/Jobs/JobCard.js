import React from 'react'
import { Grid,Button } from '@mui/material'
import './Jobs.css'
import moment from 'moment'
const JobCard = ({ job,appplyForJob}) => {
    const { company_logo,
        createdAt,
        employerName,

        jobId,

        jobLocation,
        jobTitle,
        jobType,
        salary,
        yearsOfExperience,
        company_tag
        = 'hello',
        company_size = '100-500' } = job
    return (
        <div className='job-card-container'> 

            <Grid marginTop={1} marginBottom={1} rowSpacing={1} container spacing={3}>
                <Grid sx={{
                    display:'flex',
                    alignItems:'center'
                }}
                item xs={3} md={2}>
                    <img src={company_logo} alt='company logo' width='100%'/>
                </Grid>
                <Grid item xs={8} md={10} className='job-card-container_title'
                sx={{textAlign:'left'}}>
                    <h2>{employerName}</h2>
                    <h5>{company_tag}</h5>
                    <h6>{company_size}</h6>
                </Grid>
            </Grid>
            <Grid container className='job-card-container_details'>
            <Grid item xs={7} md={3} className='job-card-contaier-details-title'>
                    {jobTitle}
                </Grid>
            <Grid item xs={5} md={2} className='job-card-contaier-details-location'>
                    {jobLocation}
                </Grid>
                <Grid item xs={8} md={3} className='job-card-contaier-details-location'>
                    {salary.currency}  {salary.min}-{salary.max}
                </Grid>
                <Grid item xs={4} md={2} className='job-card-contaier-details-time'>
                    {moment(createdAt).startOf('hour').fromNow()}
                </Grid>
                <Grid item xs={12} md={2}>
                    <button onClick={()=>appplyForJob(job)} className='apply-btn'>Apply</button>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default JobCard