import React, { useContext, useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { collection, query, where, onSnapshot, setDoc, doc } from 'firebase/firestore'
import { UserContext } from '../../../context/UserContext'
import { db } from '../../../FireBaseConfig/FireBaseConfig'
import LastMessage from '../../common/conversationComponents/LastMessage'
import MessageArea from '../../common/conversationComponents/MessageArea'
import { v4 as uuidv4 } from 'uuid'
const EmployerConversation = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [lastMessages, setLastMessages] = useState(null);
  const [mobileViewLastMessage, setMobileViewLastMessage] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [allConversations, setAllConversations] = useState(null)
  const fetchLastMessages = async () => {
    const q = query(collection(db, "last_messages"),
      where("employerId", "==", userData.user.email))
    onSnapshot(q, (querySnapShot) => {
      let lastMesssages = [];
      querySnapShot.forEach(doc => {
        lastMesssages.push(doc.data())
      })
      console.log(lastMesssages)
      setLastMessages(lastMesssages)
    })
  }
  useEffect(() => { fetchLastMessages() }, [])
  const handleSelectMessage = (data) => {
    setMobileViewLastMessage(false);
    setSelectedMessage(data)
    console.log("selected message", data, data.conversationKey)
  }
  useEffect(() => {
    if (lastMessages) {
      fetchAllConversations()
    }
  }, [selectedMessage])
  const fetchAllConversations = async () => {
    //fetch all applicants from firebase
    const q = query(collection(db, 'conversations'), where('conversationKey', '==', selectedMessage.conversationKey))
    // const data = await getDocs(q);
    onSnapshot(q, (querySnapShot) => {
      let conversations = [];
      querySnapShot.forEach((doc) => {

        conversations.push(doc.data())
        
      })
      conversations=conversations.sort((a,b)=> new Date(a.createdAt
        )-new Date(b.createdAt))
      setAllConversations(conversations)
      console.log(conversations, "conversations")
    })

  }
  const sendMessage = async (message, setMessage) => {
    //add a doc to conversation collection with conversation key and message
    //update last_messages collection with last message and time
    // set message to empty
    const conversationId = uuidv4()
    await setDoc(doc(db, "conversations", conversationId),
      {
        conversationKey: selectedMessage.conversationKey,
        message: message,
        senderId: userData.user.email,
        createdAt: new Date().toISOString()
      })
    await setDoc(doc(db, "last_messages", selectedMessage.last_message_id),
      {
        last_message: message

      },
      {
        merge: true
      })
      setMessage("")
  }
  return (
    <div>
      <Grid container>
        <Grid
          sx={{
            display: { xs: mobileViewLastMessage ? 'block' : 'none', md: "block" }
          }}
          item xs={12} md={3}>
          <LastMessage
            lastMessages={lastMessages}
            type={'employer'} onClick={(data) => { handleSelectMessage(data) }}
            selectedMessage={selectedMessage}
          />
        </Grid>
        <Grid
          sx={{
            display: { xs: !mobileViewLastMessage ? 'block' : 'none', md: "block" }
          }}
          item xs={12} md={9}>
          {selectedMessage ?
            <MessageArea allConversations={allConversations} selectedMessage={selectedMessage} type={'employer'}
              sendMessage={sendMessage} />
            :
            <div>Select a message</div>
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default EmployerConversation
