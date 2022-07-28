import React from 'react'

interface InputProps {
  name: string,
  type: 'text' | 'password'
  placeholder: string
}

function Input ({ name, type, placeholder }: InputProps) {
  return (
    <input name={name} type={type} placeholder={placeholder} className='bg-gray-50 border w-full border-gray-200 rounded-sm p-2 text-sm my-1 box-border'/>
  )
}

function Avatar ({ source }: any) {
  return (
    <img src={source} className='rounded-full w-7 h-7 bg-black'/>
  )
}

export {
  Input,
  Avatar
}
