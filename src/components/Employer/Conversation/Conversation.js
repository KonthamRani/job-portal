import React, { useContext ,useState,useEffect} from 'react'
import {collection,query,where,onSnapshot} from 'firebase/firestore'
import { UserContext } from '../../../context/UserContext'
import { db } from '../../../FireBaseConfig/FireBaseConfig'

const EmployerConversation = () => {
  const [userData,dispatch]=useContext(UserContext);
  const [lastMessages,setLastMessages]=useState(null)
  const fetchLastMessages=async()=>{
    const q=query(collection(db,"last_messages"),
    where("employerId","==",userData.user.email))
    onSnapshot(q,(querySnapShot)=>{
      let lastMesssages=[];
      querySnapShot.forEach(doc=>{
        lastMesssages.push(doc.data())
      })
      console.log(lastMesssages)
      setLastMessages(lastMesssages)
    })
  }
  useEffect(()=>{fetchLastMessages()},[])

  return (
    <div>
      EmployerConversation
    </div>
  )
}

export default EmployerConversation
