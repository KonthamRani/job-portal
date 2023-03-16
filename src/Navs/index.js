import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/Landingpage/LandingPage'
import Auth from '../components/auth/Auth'

import CandidateApplication from '../components/Candidate/Application/Application'
import CandidateConversation from '../components/Candidate/Conversation/Conversation'
import CandidateJobs from '../components/Candidate/Jobs/Jobs'
import CandidateOnboarding from '../components/Candidate/Onboarding/Onboarding'
import CandidateProfile from '../components/Candidate/Profile/Profile'

import EmployerApplicants from '../components/Employer/Applicants/Applicants'
import EmployerConversation from '../components/Employer/Conversation/Conversation'
import EmployerJobs from '../components/Employer/Jobs/Jobs'
import EmployerOnboarding from '../components/Employer/Onboarding/Onboarding'
import EmployerProfile from '../components/Employer/Profile/Profile'

function Navs() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/employer/auth" type="employer" element={<Auth/>} />
                <Route path="/candidate/auth/:id" type="candidate" element={<Auth/>} />
                
                <Route path='/candidate/jobs' element={<CandidateJobs/>}/>
                <Route path='/candidate/profile' element={<CandidateProfile/>}/>
                <Route path='/candidate/onboarding' element={<CandidateOnboarding/>}/>
                <Route path='/candidate/applications' element={<CandidateApplication/>}/>
                <Route path='/candidate/conversation' element={<CandidateConversation/>}/>
                
                <Route path='/employer/jobs' element={<EmployerJobs/>}/>
                <Route path='/employer/profile' element={<EmployerProfile/>}/>
                <Route path='/employer/onboarding' element={<EmployerOnboarding/>}/>
                <Route path='/employer/applicants' element={<EmployerApplicants/>}/>
                <Route path='/employer/conversation' element={<EmployerConversation/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navs
