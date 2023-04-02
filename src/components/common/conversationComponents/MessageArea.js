import React, { useContext,useState } from 'react'
import './conversation.css'
import { UserContext } from '../../../context/UserContext'
import { TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
const mock=[
    {
        id:"fsfa",
        message:"hello",
        senderId:"gfaga"
    },
    {
        id:"fsf1a",
        message:"hello1",
        senderId:"gfa1ga"
    },
    {
        id:"fsfa2",
        message:"hello2",
        senderId:"gfaga2"
    },
    {
        id:"fsfa3",
        message:"hello3",
        senderId:"gfaga3"
    },
    {
        id:"fsfa4",
        message:"hello4",
        senderId:"gfaga4"
    }
]
const MessageArea = ({
    allConversations,
    selectedMessage,
    type,
    sendMessage
}) => {
    const [userData,dispatch]=useContext(UserContext);
    const [textMessage,setTextMessage]=useState("")
    return (
        <div className='message-area-container'>
            <div className='message-area-container-header'>{
                type==='employer'?selectedMessage.candidateName:
                selectedMessage.employerName
                }
                </div>
            <div className='message-area-container-messages'>
                {
                    allConversations && allConversations.map(item=>{
                        return(
                            <div
                            className='message-area-container-messages-message'
                            style={{
                                justifyContent:item.senderId===userData.user.email?"flex-end":"flex-start"
                            }}
                            >
                                <div style={{
                                    borderRadius:item.senderId===userData.user.email?"16px 0px 16px 16px":
                                    "0px 16px 16px 16px"
                                }}>

                                {item.message}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='message-area-container-text-area'
            >
                <TextField fullWidth
                size="small"
                value={textMessage}
                onChange={e=>{
                    setTextMessage(e.target.value)
                }}
                />
                <button
                disabled={textMessage.length===0}
                style={{
                    opacity:textMessage.length===0?0.5:1
                  }}
                onClick={()=>{
                    sendMessage(textMessage,setTextMessage
                        );
                }}
                >Send<SendIcon/>
                </button>
            </div>
        </div>
    )
}

export default MessageArea
