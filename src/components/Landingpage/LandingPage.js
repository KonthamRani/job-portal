import React from 'react'
import TopBar from './TopBar'
import RightJobSection from './RightJobSection'
import OnePlatform from './OnePlatform'
import AllCandidates from './AllCandidates'
import Footer from './Footer'
import './LandingPage.css'






function LandingPage() {
  return (
    <div>
      <TopBar/>
      <RightJobSection/>
      <OnePlatform/>
      <AllCandidates/>
      <Footer/>
    </div>
  )
}

export default LandingPage
