import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../services/firebase/firebase-config'
import { Avatar } from '../lib'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import search from '../../assets/search.svg'
import { useState } from 'react'

export function SearchBar () {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value)
  }
  const [searchResults] = useCollectionData(
    query(collection(db, 'users'),
      where('username', '>=', searchTerm),
      where('username', '<=', searchTerm + '~')
    )
  )
  const handleSubmit = (event: any) => {
    event.preventDefault()
    navigate(`/${searchTerm}`)
  }
  return (
    <Combobox aria-label="Cities">
      <form onSubmit={handleSubmit} className='bg-gray-100 rounded-lg outline-none flex flex-row py-2'>
        <div className='w-4 flex justify-center opacity-50 mx-3'>
          <img src={search}/>
        </div>
          <ComboboxInput
            className='outline-none bg-transparent'
            onChange={handleSearchTermChange}
            placeholder='Search'/>
      </form>
      {searchResults && (
        <ComboboxPopover>
          {searchResults.length > 0
            ? <ComboboxList className='bg-white w-72 rounded-lg shadow-lg py-2 relative right-20'>
                {searchResults.map((user) => {
                  const { username, profilePicture } = user
                  return (
                    <ComboboxOption key={username} value={username}>
                      <Link to={`/${username}`}>
                        <div className='w-full flex flex-row py-3 px-5 hover:bg-gray-50'>
                          <div className='mr-2'>
                            <Avatar picture={profilePicture} size='small' />
                          </div>
                          <div className='text-xs'>
                            <div className='font-semibold'>
                              {username}
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
            : <div className='bg-white rounded-lg shadow-lg text-center py-2 px-3 w-80 relative right-1/2'>
                No results found
              </div>}
          </ComboboxPopover>
      )}
    </Combobox>
  )
}
