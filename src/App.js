import React from 'react'
import Navs from './Navs'
import {UserContextProvider} from './context/UserContext'
function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <UserContextProvider>
        <Navs />
      </UserContextProvider>
    </div>
  )
}

export default App
