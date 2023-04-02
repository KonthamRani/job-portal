import { collection,doc, setDoc, query, where, onSnapshot, deleteDoc } from 'firebase/firestore'
import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
import { db } from '../../../FireBaseConfig/FireBaseConfig'
import Table from '../../common/Table/Table'
import toastMessage from '../../../Util/toastMessages';
import {v4 as uuidv4} from  'uuid'
const EmployerApplicants = () => {
  const [applicants, setApplicants] = useState(null)
  const [userData, dispatch] = useContext(UserContext)
  const columns=[
    {
    Header:"Candidate Name",
    datakey:"candidateName",
    style:{
      width:"25%"
    }
  },
    {
    Header:"Job Title",
    datakey:"jobTitle",
    style:{
      width:"25%"
    }
  },
    {
    Header:"Resume",
    datakey:"resume",
    type:"doc",
    style:{
      width:"25%"
    }
  },
    {
    Header:"Action",
    datakey:"action",
    type:"action",
    style:{
      width:"25%"
    }
  }

]
const handleAction=async (type,data)=>{
  if(type==='accept'){
    try{
    const last_message_id=uuidv4()
    const conversationKey=uuidv4()
    const conversation_id=uuidv4()
    //1.add a document in last message collection
    //2.generate a conversation key
    //3. Add a document in conversation collection wuth specific conversation key
    //4, update application address to accepted
    await setDoc(
      doc(db,"last_messages",last_message_id),
      {
        last_message_id,
        last_message:`hey ${data.candidateName}! we have accepted your application for the job ${data.jobTitle}`,
        createdAt:new Date().toISOString(),
        conversationKey,
        employerId:userData.user.email,
        candidateId:data.candidateId,
        candidateName:data.candidateName,
        employerName:data.employerName
      })
      await setDoc(
        doc(db,"conversations",conversation_id),
        {
          conversation_id,
          conversationKey,
          senderId:userData.user.email,
          candidateName:data.candidateName,
          employerName:userData.user.displayName,message:`hey ${data.candidateName}! we have accepted your application for the job ${data.jobTitle}`,
          createdAt:new Date().toISOString()
          
        }
      )
      await setDoc(
        doc(db,"applications",data.applicationId),
        {status:"accepted"},
        {merge:true}
      )
      toastMessage("Application accepted","success")
      }
      catch(error){
        toastMessage("Something went wrong","danger")
      }
  }
  else if(type==="reject"){
    //delete the application with application id
    try{
      console.log(data.applicationId,"app id")
      const doc_ref=doc(db,"applications",data.applicationId)
      await deleteDoc(doc_ref)
      
      toastMessage("Application is rejected",'success')
      
    }
    catch(error){
      console.log(error);
      toastMessage("Something went wrong",'error')
    }
  }
  console.log(type,data);
}
  const fetchAllApplicants = async () => {
    //fetch all applicants from firebase
    const q = query(collection(db, 'applications'), where('employerId', '==', userData.user.email))
    // const data = await getDocs(q);
    onSnapshot(q,(querySnapShot)=>{
      let apps=[];
      querySnapShot.forEach((doc)=>{
        
        apps.push(doc.data())
    
      })
      setApplicants(apps)
      console.log(apps,"apps")
    })
    
  }
  useEffect(()=>{fetchAllApplicants()},[])
  return (
    applicants && applicants.length === 0 ? <div>No applicants yet</div> :
      applicants && applicants.length > 0 ? <div>
        <Table handleAction={handleAction} columns={columns} data={applicants}/>
      </div> : <div>Loading...</div>
  )
}

export default EmployerApplicants
