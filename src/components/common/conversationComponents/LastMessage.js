import React from 'react'
import moment from 'moment'
import './conversation.css'
const LastMessage = ({
    lastMessages, type,onClick,selectedMessage
}) => {

    return (
        <div className='last-message-container'>
            {lastMessages && lastMessages.length === 0 ? <div>No messages</div> :
                lastMessages && lastMessages.length > 0 ? <div>
                    {
                        lastMessages.map(lastMessage => {
                            return (
                                <div onClick={()=>{
                                    onClick(lastMessage)
                                }} className={`last-message ${selectedMessage && selectedMessage.last_message_id===lastMessage.last_message_id&&"last-message-text-selected"}`}>
                                    <div className='last-message-header'>
                                        <h2>{
                                            type === 'employer' ?
                                                lastMessage.candidateName
                                                : lastMessage.employerName
                                        }</h2>
                                        <h3>{moment(lastMessage.createdAt).startOf('hour').fromNow()}</h3>
                                    </div>
                                    <div className='last-message-text'>{lastMessage.last_message}</div>
                                </div>
                            )
                        })
                    }
                </div> :
                    <div>Loading...</div>}
        </div>
    )
}

export default LastMessage
