import { Menu, MenuButton, MenuItem, MenuLink, MenuList } from '@reach/menu-button'
import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/current-user'
import { auth } from '../../services/firebase/firebase-config'
import { Avatar } from '../lib'
import profile from '../../assets/profile.svg'
import React from 'react'

export function HeaderMenuButton () {
  const { profilePicture, username } = useUserContext()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }
  return (
    <Menu>
      <MenuButton>
        <Avatar picture={profilePicture} size='small' />
      </MenuButton>
      <MenuList className='bg-white shadow-lg w-40 rounded-md text-sm right-32 top-3 relative'>
        <MenuLink as={Link} to={`/${username}`} className='w-full px-5 py-2 flex flex-row hover:bg-gray-50 hover:rounded-t-md'>
          <img src={profile} className='w-4 mr-2' />Profile
        </MenuLink>
        <MenuItem className='border-t w-full px-5 py-2 hover:bg-gray-50 hover:rounded-b-md cursor-pointer' onSelect={handleLogout}>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
