import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import axios from '../api/axios';
import Loading from './Loading';
const Result = ({searchData, activeSong, isPlaying, search, isSearchResults}) => {
  return(
    <div className={`flex-col w-full ease-in duration-300 ${search && isSearchResults ? `flex` : 'hidden'}`}>
      {/* top songs*/}
      <div className='flex flex-col animate-slideup duration-300'>  
        {searchData?.map((song,i)=>
        <PlaylistCard
          key={ song?._id}
          songId={ song?._id}
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

const PlaylistResults = ({search, isSearchResults }) => {
  const {activeSong, isPlaying} = useSelector(state => state.player)
  const [searchData, setSearchData] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false)

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get(`chart/songs?title=${search}`)
        setIsFetching(false)
        setSearchData(data?.data)
      } catch (error) {
        setIsFetching(false)
        console.log(error)
      }
    }
    getSearchResults()
  }, [search])

  if(isFetching) return <Loading />

  return (
    <Result
      searchData={searchData}
      activeSong={activeSong}
      isPlaying={isPlaying}
      search={search}
      isSearchResults={isSearchResults}
    />
  )
}

export default PlaylistResults