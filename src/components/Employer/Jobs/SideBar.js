import React, { useContext,useState,useEffect } from 'react'
import SideJobCard from './SideJobCard'
import {TextField} from '@mui/material'
import { UserContext } from '../../../context/UserContext'
import { db } from "../../../FireBaseConfig/FireBaseConfig"
import {collection,onSnapshot,query,where} from "firebase/firestore"
import './Jobs.css'

const SideBar = ({ postAjob,selectedJob,selectAJob }) => {
    const [allJobs,setAllJobs]=useState(null)
    const [userData,dispatch]=useContext(UserContext)
    const fetchAllJobs=()=>{
        const q=query(
            //collectionref
            collection(db,'jobs'),
            //condition
            where('employerId','==',userData.user.email)
        )
        onSnapshot(q,(snapshot)=>{
            let jobs=[];
            snapshot.forEach(doc=>{
                jobs.push(doc.data())
            })
            setAllJobs(jobs);
            console.log(jobs);
        })
    }
    useEffect(()=>{
        fetchAllJobs();
    },[])
    return (
        <div className='sidebar-container'>

            <div className='postBtn'>
                <div onClick={postAjob}>
                    <p>+ Post a Job</p></div>
        <div>Post your requirements and hire candidates</div>
            </div>
            <div>
               <TextField 
               sx={{'fieldset':{
                borderRadius:'20px'
               }}}fullWidth size='small'
               placeholder='Search Jobs'/>
            </div>
            <div>
            {allJobs&& allJobs.length===0?(<div>no jobs found</div>):allJobs&& allJobs.length>0?
            (allJobs.map((data)=>{
                return <SideJobCard selectedJob={selectedJob} selectAJob={selectAJob}  key={data.jobId} data={data}/>
            })):
            <div>Loading</div>
        }
            </div>
        </div>
    )
}

export default SideBar
