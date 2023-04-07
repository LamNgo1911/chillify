import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Searchbar({search, setSearch}) {

  return (
    <form autoComplete="off" className="p-2 text-textColor focus-within:text-textColorLight">
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className=' flex items-center border border-bgColorLight w-full p-2 rounded-full'>
          <SearchIcon style={{ fontSize: 30 }}/>
          <input
          autoComplete="off"
          name='search-field'
          value={search}
          onChange={e => setSearch(e.target.value)} 
          type="search" 
          placeholder='Search' 
          className='w-full p-2 border-none outline-none bg-transparent'
          />
      </div>
    </form>
  )
}

export default Searchbar