import React from 'react'
import './Jobs.css'
const SideJobCard = ({ data, selectedJob, selectAJob }) => {
  const {
    jobTitle,
    jobLocation,
    createdAt,
    jobType,
    jobId
  } = data
  return (
    <div
    onClick={()=>{selectAJob(data)}}
      className={`sideJobCard ${selectedJob && selectedJob.jobId === jobId && 'sideJobCard-selected'}`}>
      <h6>{createdAt}</h6>
      <h1>{jobTitle}</h1>
      <h2>{jobLocation}</h2>
      <p>{jobType}</p>
    </div>
  )
}

export default SideJobCard
