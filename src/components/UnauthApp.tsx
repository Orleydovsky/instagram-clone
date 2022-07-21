import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { SignUpForm } from './SignUpForm'
function UnauthApp () {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignUpForm/>}/>
      </Routes>
    </div>
  )
}

export default UnauthApp
