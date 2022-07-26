import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import NotFoundPage from './NotFoundPage'

function AuthApp () {
  return (
    <div className='w-full flex justify-center'>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  </div>
  )
}

export default AuthApp
