import React from 'react'
import SongCard from '../components/SongCard';

import { useSelector } from 'react-redux';
import Loading from './Loading';
import axios from '../api/axios';
const SearchResult = ({searchData, activeSong, isPlaying, search}) => {
  return(
    <div className={`flex-col px-4 w-full ease-in duration-300 ${search ? `flex` : 'hidden'}`}>
      {/* top navgations */}
      <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row'>
            <h2 className='text-base md:text-lg font-bold'>Results</h2>
          </div>
      </div>
      {/* top songs*/}
      <div className='flex flex-wrap justify-start gap-4 mt-8'>  
        {searchData?.map((song,i)=>
        <SongCard
          key={song?._id || song?._id}
          songId={song?._id || song?._id}
          artistId={song?.artist?.artistId}
          song={song}
          i={i}
          data={searchData}
          activeSong={activeSong}
          isPlaying={isPlaying}
        />)}
      </div>  
    </div>
  )
}

const SearchResults = ({search}) => {
  const {activeSong, isPlaying} = useSelector(state => state.player)
  const [searchData, setSearchData] = React.useState(null)
  const [isFetching, setIsFetching] = React.useState(false)
  // console.log(search)
  // console.log(searchData)
  React.useEffect(() => {
    const getSearchData = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get(`chart/songs?title=${search}`)
        setIsFetching(false)
        setSearchData(data?.data)
        console.log(data?.data)
      } catch (error) {
        setIsFetching(false)
        console.log(error)
      }
    }
    getSearchData()
  }, [search])

  if (isFetching) return <Loading />
  if(isFetching === false && searchData?.length === 0) return <h1 className='text-2xl flex justify-center items-center h-[80vh]'>No results found</h1>

  return (
    <SearchResult
      searchData={searchData}
      activeSong={activeSong}
      isPlaying={isPlaying}
      search={search}
    />
  )
}

export default SearchResults