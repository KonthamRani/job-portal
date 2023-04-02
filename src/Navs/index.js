import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import LandingPage from '../components/Landingpage/LandingPage'
import Auth from '../components/auth/Auth'

import TopBar from '../components/common/TopBar/TopBar'

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
    const Candidateprotected = () => {
        const pages = [
            {
                title: 'Jobs',
                path: '/candidate/jobs'
            },
            {
                title: 'Profile',
                path: '/candidate/profile'
            },
            {
                title: 'Conversation',
                path: '/candidate/conversation'
            },
            {
                title:'Applications',
                path:'/candidate/applications'
            }
        ];
        return (
            <div>
                <TopBar pages={pages} />
                <div style={{marginTop:"70px"}}>

                <Outlet />
                </div>

            </div>
        )
    }
    const Employerprotected = () => {
        const pages = [
            {
                title: 'Jobs',
                path: '/employer/jobs'
            },
            {
                title: 'Profile',
                path: '/employer/profile'
            },
            {
                title: 'Conversation',
                path: '/employer/conversation'
            },
            {
                title: 'Applicants',
                path: '/employer/applicants'
            },
        ];
        return (
            <div>
                <TopBar pages={pages} />
                <div style={{marginTop:"70px"}}>

                <Outlet />
                </div>

            </div>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/employer/auth" element={<Auth type="employer" />} />
                <Route path="/candidate/auth" element={<Auth type="candidate" />} />

                <Route element={<Candidateprotected />}>
                    <Route path='/candidate/jobs' element={<CandidateJobs />} />
                    <Route path='/candidate/profile' element={<CandidateProfile />} />
                    <Route path='/candidate/onboarding' element={<CandidateOnboarding />} />
                    <Route path='/candidate/applications' element={<CandidateApplication />} />
                    <Route path='/candidate/conversation' element={<CandidateConversation />} />
                </Route>

                <Route element={<Employerprotected />}>
                    <Route path='/employer/jobs' element={<EmployerJobs />} />
                    <Route path='/employer/profile' element={<EmployerProfile />} />
                    <Route path='/employer/onboarding' element={<EmployerOnboarding />} />
                    <Route path='/employer/applicants' element={<EmployerApplicants />} />
                    <Route path='/employer/conversation' element={<EmployerConversation />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Navs;
