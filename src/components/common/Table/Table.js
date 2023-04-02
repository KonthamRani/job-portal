import React from 'react'
import './Table.css'
import moment from 'moment'
const Table = ({ columns, data,handleAction }) => {
  console.log(data,"data in table",columns)
  return (
    <div>
      <div className="table-header">{
        columns.map(column => {
          return <div
          style={column.style}
          >{column.Header}</div>
        })
       }
      </div>
      <div>
        {data.map(row=>{
          return (
            <div className='table-row'>
              {columns.map(column=>{
                console.log("columns",columns)
                if(column.type==="date")
                {
                 
                  return (
                  <div
                style={column.style}>
                  { moment(row[column.datakey]).format("MMM Do YY")}
               
                </div>
                )
                }
                else if(column.type==='doc')
                {

                return <div
                style={column.style}>
                  <button onClick={()=>{
                    window.open
                    (row[column.datakey
                    ])
                  }} className="resume-btn">View Resume</button>
                </div>
                }
                else if(column.type==='action')
                {

                return <div
                style={column.style}>
                  <button className="accepted"
                  disabled={row.status==="accepted"?true:false}
                  style={{
                    opacity:row.status==='accepted'?0.5:1
                  }}
                  onClick={()=>{handleAction("accept",row)}}>Accept</button>
                  <button className='rejected' 
                  disabled={row.status==='accepted'?true:false}
                  style={{
                    opacity:row.status==='accepted'?0.5:1
                  }}
                  onClick={()=>{handleAction("reject",row)}}>Reject</button>
                </div>
                }
                else
                {

                return <div
                style={column.style}>
                  {row[column.datakey]}
                </div>
                }
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Table
