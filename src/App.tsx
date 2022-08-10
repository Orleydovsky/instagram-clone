import { onAuthStateChanged, User } from 'firebase/auth'
import { lazy, useEffect, useState } from 'react'
import { auth } from './services/firebase/firebase-config'
const AuthApp = lazy(() => import('./pages/auth-app'))
const UnauthApp = lazy(() => import('./pages/unauth-app'))

function App () {
  const [loggedIn, setLoggedIn] = useState<User | boolean | null>(auth.currentUser)
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
