import React from 'react'
import '../Landingpage/LandingPage.css'
const Cards = ({
  title, subtitle, icon
}) => {
  return (
    <div className='card-container'>
      <div className='card-icon'>
        <img src={icon} alt='icon' height="40px" width="40px" />
      </div>
      <div className='card-content'>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export default Cards