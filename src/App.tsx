import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import AuthApp from './components/AuthApp'
import UnauthApp from './components/UnauthApp'
import { auth } from './services/firebase/firebase-config'
function App () {
  const [loggedIn, setLoggedIn] = useState(true)
  onAuthStateChanged(auth, user => {
    user ? setLoggedIn(true) : setLoggedIn(false)
  })
  return (
    <div className='bg-gray-50 flex justify-center min-h-screen'>
      {loggedIn ? <AuthApp/> : <UnauthApp/>}
    </div>
  )
}

export default App
