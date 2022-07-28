import { onAuthStateChanged } from 'firebase/auth'
import React, { lazy, useCallback, useEffect, useState } from 'react'
import { auth } from './services/firebase/firebase-config'
const AuthApp = lazy(() => import('./pages/AuthApp'))
const UnauthApp = lazy(() => import('./pages/UnauthApp'))

function App () {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      user ? setLoggedIn(true) : setLoggedIn(false)
    })
  }, [])
  return (
    <div className='bg-gray-50 flex justify-center min-h-screen'>
      {loggedIn ? <AuthApp/> : <UnauthApp/>}
    </div>
  )
}

export default App
