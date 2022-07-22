import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import NotFoundPage from './NotFoundPage'
import { SignUpForm } from './SignUpForm'
function UnauthApp () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignUpForm/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  )
}

export default UnauthApp
