import React from 'react'
import Cards from '../common/Cards'
import './LandingPage.css'
import micon from '../../assets/micon.png'
import design from '../../assets/design.png'
import humanResearch from '../../assets/humanResearch.png'
import finance from '../../assets/finance.png'
import governmentJobs from '../../assets/governmentJobs.png'
import businessConsulting from '../../assets/businessConsulting.png'
import CustomerSupport from '../../assets/CustomerSupport.png'
import projectManagement from '../../assets/projectManagement.png'
const data=[
  
  {
  title:"Marketing and Communication",
  subtitle:'',
  icon:micon
},
  {
  title:'Design & Development',
  subtitle:'237 Jobs Available',
  icon:design
},
  {
  title:'Human Research & Development',
  subtitle:'237 Jobs Available',
  icon:humanResearch
},
  {
  title:"Finance Management",
  subtitle:'237 Jobs Available',
  icon:finance
},
  {
  title:"Government Jobs",
  subtitle:'237 Jobs Available',
  icon:governmentJobs
},
  {
  title:"Business and Consulting",
  subtitle:'237 Jobs Available',
  icon:businessConsulting
},
  {
  title:"Customer Support Care",
  subtitle:'237 Jobs Available',
  icon:CustomerSupport
},
  {
  title:"Project Management",
  subtitle:'237 Jobs Available',
  icon:projectManagement
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