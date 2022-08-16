import { Link } from 'react-router-dom'
import { db } from '../../services/firebase/firebase-config'
import { Avatar } from '../lib'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import search from '../../assets/search.svg'
import { useState } from 'react'

export function SearchBar () {
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
  return (
    <Combobox aria-label="Cities">
      <form className='bg-gray-100 rounded-lg py-2 px-3 outline-none flex flex-row'>
        <img src={search} className='w-4 opacity-50 mr-3' />
        <ComboboxInput
          className='outline-none bg-transparent'
          onChange={handleSearchTermChange}
          placeholder='Search' />
      </form>
      {searchResults && (
        <ComboboxPopover>
          {searchResults.length > 0
            ? <ComboboxList className='bg-white w-60 rounded-lg shadow-lg'>
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
            : <span className='bg-white w-60 rounded-lg shadow-lg text-center'>
                No results found
              </span>}
          </ComboboxPopover>
      )}
    </Combobox>
  )
}
