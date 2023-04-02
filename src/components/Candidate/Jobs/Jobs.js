import React, { useContext, useEffect,useState } from 'react'
import {db} from '../../../FireBaseConfig/FireBaseConfig'
import { doc, setDoc,collection,query,getDocs,where} from 'firebase/firestore';
import JobCard from './JobCard'
import {v4 as uuidv4} from 'uuid'
import {UserContext} from '../../../context/UserContext'
import toastMessage from '../../../Util/toastMessages';
const CandidateJobs = () => {
  const [userData,dispatch]=useContext(UserContext)
  const [jobs,setJobs]=useState([])
  const fetchAllJobs=async()=>{
    try{
    const q=query(collection(db,'jobs'))
    const data=await getDocs(q);
    let j=[];
    data.forEach(doc=>{
      console.log(doc.data())
      j.push(doc.data())
    })
    setJobs(j)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{fetchAllJobs()},[])
  const appplyForJob=async (job)=>{
    console.log(job);
    const q=query(collection(db,'applications'),where('candidateId','==',userData.user.email))
    const data=await getDocs(q)
    let applications=[];
    data.forEach(doc=>{
      applications.push(doc.data())
    });
    let alreadyApplied=applications.find(application=>{
      return application.jobId===job.jobId
    })
    if(alreadyApplied){
      toastMessage('You have already applied for this job','warning')
      return
    }
    try{
    const applicationId=uuidv4()
    await setDoc(doc(db,'applications',applicationId),{
      applicationId,
      candidateId:userData.user.email,
      candidateName:userData.user.displayName,
      employerId:job.employerId,
      employerName:job.employerName,
      jobId:job.jobId,
      jobTitle:job.jobTitle,
      jobLocation:job.jobLocation,
      jobType:job.jobType,
      resume:userData.userInfo.resume,
      status:"applied",
      createdAt:new Date().toISOString()
    })
    toastMessage('Applied for job successfully','success')
  }
    catch(error){
      console.log(error);
      toastMessage('Error while applying for job','danger')
    }
  }
  return (
    jobs && jobs.length===0 ? <div>no job</div>:
    jobs&&jobs.length>0?
    <div>
      {" "}
    { jobs.map(job=>{
      return <JobCard  key={job.jobId} job={job} appplyForJob={appplyForJob}/>
     })}
    </div>:
    <div>Loading</div>
  )
}

export default CandidateJobs
