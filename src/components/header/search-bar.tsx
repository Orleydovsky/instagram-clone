import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../services/firebase/firebase-config'
import { Avatar } from '../lib'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import search from '../../assets/search.svg'
import '@reach/combobox/styles.css'

export function SearchBar () {
  const navitage = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchInput = event.currentTarget.elements.namedItem('searchInput') as HTMLInputElement
    navitage(`/${searchInput.value}`)
  }
  const [searchResults] = useCollectionData(
    query(collection(db, 'users'),
      where('username', '>=', searchTerm),
      where('username', '<=', searchTerm + '~')
    )
  )
  return (
    <Combobox aria-label='users'>
      <form onSubmit={handleSubmit} className='bg-gray-100 rounded-lg outline-none flex flex-row py-2'>
        <div className='w-4 flex justify-center opacity-50 mx-3'>
          <img src={search}/>
        </div>
        <ComboboxInput
          name='searchInput'
          className='outline-none bg-transparent'
          onChange={handleSearchTermChange}
          placeholder='Search'/>
      </form>
      {searchResults && (
        <ComboboxPopover>
          {searchResults.length > 0
            ? <ComboboxList className='w-full'>
                {searchResults.map((user) => {
                  const { username, profilePicture, name } = user
                  return (
                    <ComboboxOption key={username} value={username}>
                      <Link to={`/${username}`}>
                        <div className='w-full flex flex-row py-1 px-5'>
                          <div className='mr-2'>
                            <Avatar picture={profilePicture} size='small' />
                          </div>
                          <div className='text-xs'>
                            <div className='font-semibold'>
                              {name}
                            </div>
                            <div className='text-gray-400'>
                              <ComboboxOptionText />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </ComboboxOption>
                  )
                })}
              </ComboboxList>
            : <div className='text-center w-full'>
                No results found
              </div>}
          </ComboboxPopover>
      )}
    </Combobox>
  )
}
