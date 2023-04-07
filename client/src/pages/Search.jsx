import React from 'react'
import Categories from '../components/Categories'
import Searchbar from '../components/Searchbar'
import SearchResults from '../components/SearchResults'
import { useNavigate } from 'react-router-dom'

const Search = ({auth}) => {
  const [search, setSearch] = React.useState('')
  const navigate = useNavigate()

  !auth && navigate('/search')
  return (
    <div className='mt-16 md:mt-8 flex flex-col px-8 pb-8 gap-12'>
        <Searchbar 
          search={search}
          setSearch={setSearch}
        />
        <Categories 
          search={search}
        />
        <SearchResults 
          search={search}
          setSearch={setSearch}
        />
    </div>
  )
}

export default React.memo(Search)