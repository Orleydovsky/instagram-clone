import React from 'react'

interface InputType {
  name: string,
  type: 'text' | 'password'
  placeholder: string
}

function Input ({ name, type, placeholder }: InputType) {
  return (
    <input name={name} type={type} placeholder={placeholder} className='bg-gray-50 border w-full border-gray-200 rounded-sm p-2 text-sm my-1 box-border'/>
  )
}

interface AvatarType {
  source: string
}

function Avatar ({ source }: AvatarType) {
  return (
    <img src={source} className='rounded-full aspect-square object-cover'/>
  )
}

export {
  Input,
  Avatar
}
