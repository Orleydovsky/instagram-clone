import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import NotFoundPage from './NotFoundPage'
import { SignUpForm } from '../components/SignUpForm'
function UnauthApp () {
  return (
    <div className='w-full flex justify-center'>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignUpForm/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  )
}

export default UnauthApp
