import React from 'react'
import Cards from '../common/Cards'
import './LandingPage.css'
import micon from '../../assets/micon.png'
const data=[
  
  {
  title:"Marketing and Communication",
  subtitle:'',
  icon:micon
},
//   {
//   title:'Design & Development',
//   subtitle:'237 Jobs Available',
//   icon:pencil
// },
//   {
//   title:'Human Research & Development',
//   subtitle:'237 Jobs Available',
//   icon:humanResearch
// },
  // {
  // title:"Finance Management",
  // subtitle:'237 Jobs Available',
  // icon:finance
// },
  {
  title:"Marketing and Communication",
  subtitle:'237 Jobs Available',
  icon:micon
},
  {
  title:"Marketing and Communication",
  subtitle:'237 Jobs Available',
  icon:micon
},
  {
  title:"Marketing and Communication",
  subtitle:'237 Jobs Available',
  icon:micon
},
  {
  title:"Marketing and Communication",
  subtitle:'237 Jobs Available',
  icon:micon
},
  {
  title:"Marketing and Communication",
  subtitle:'237 Jobs Available',
  icon:micon
},
  {
  title:"Marketing and Communication",
  subtitle:'237 Jobs Available',
  icon:micon
}
]
const OnePlatform = () => {
  return (
    <div className='one-platform-container'>
      <h1>One Platform Many <span>Solutions</span></h1>
    <div>{
      
     data.map((item,index)=>{
      return(
        <Cards
        title={item.title}
        subtitle={item.subtitle}
        icon={item.icon}
        key={index}/>
      )
     })
      }
    </div>
    
    </div>
  )
}

export default OnePlatform