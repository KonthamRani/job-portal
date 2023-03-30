import React, { useContext, useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../../FireBaseConfig/FireBaseConfig'
import { UserContext } from '../../../context/UserContext'
import Table from '../../common/Table/Table'

const columns = [{
  Header: "Company",
  datakey:"employerName",
  type:"date",
  style:{
    width:'25%'
  }
}, {
  Header: "Job Title",
  datakey:"jobTitle",
  type:"date",
  style:{
    width:'25%'
  }
},
{
  Header: "Intrest Shown",
  datakey:"createdAt",
  type:"date",
  style:{
    width:'25%'
  }
},
{
  Header: "Status",
  datakey:"status",
  type:"date",
  style:{
    width:'25%'
  }
}

]
const CandidateApplication = () => {
  const [applications, setApplications] = useState(null)
  const fetchAllApplications = async () => {
    const q = query(collection(db, 'applications'), where('candidateId', '==', userData.user.email))
    const data = await getDocs(q);
    let apps = [];
    data.forEach(doc => {
      apps.push(doc.data())
    })
    setApplications(apps)
    console.log("applications",apps)
  };
  useEffect(() => { fetchAllApplications() }, [])
  const [userData, dispatch] = useContext(UserContext)
  return (
    applications && applications.length === 0 ? <div>No applications found</div> :
      applications && applications.length > 0 ? <div><Table columns={columns} data={applications} /></div> : <div>Loading...</div>
  )
}

export default CandidateApplication
