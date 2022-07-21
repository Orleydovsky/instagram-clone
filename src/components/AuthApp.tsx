import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../services/firebase/firebase-config'

function AuthApp () {
  const logout = async () => {
    await signOut(auth)
  }
  return (
    <div>
        AuthApp
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default AuthApp
