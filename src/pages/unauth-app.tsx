import { Route, Routes } from 'react-router-dom'
import { LoginForm } from '../components/login-form'
import NotFoundPage from './not-found-page'
import { SignUpForm } from '../components/sign-up-form'
export default function UnauthApp () {
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
