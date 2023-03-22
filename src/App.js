import React from 'react'
import Navs from './Navs'
import {UserContextProvider} from './context/UserContext'
import {ReactNotifications} from 'react-notifications-component' 
import 'react-notifications-component/dist/theme.css'
function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <UserContextProvider>
        <ReactNotifications/>
        <Navs />
      </UserContextProvider>
    </div>
  )
}

export default App
