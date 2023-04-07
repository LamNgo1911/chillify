import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import PlaylistCard from './PlaylistCard'
import axios from '../api/axios'

function PlaylistRecommend({isSearchResults}) {
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const [songsData, setSongsData] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(false)
    React.useEffect(() => {
        const getSongs = async () => {
            try {
                setIsFetching(true)
                const {data} = await axios.get(`chart/songs`)
                setIsFetching(false)
                setSongsData(data?.data)
            } catch (error) {
                setIsFetching(false)
                console.log(error)
            }
        }
        getSongs()
    }, [])
    // console.log(songsData)
    if(isFetching) return <Loading />
    return(
        <div className={` flex-col w-full ease-in duration-300 ${isSearchResults ? "hidden" : "flex" } `}>
            <div>
                <h2 className='text-lg md:text-2xl font-bold pb-8 px-8'>Recommended Songs:</h2>
            </div>
          {/* top songs*/}
          <div className='flex flex-col animate-slideup duration-300'>  
            {songsData?.map((song,i)=>
            <PlaylistCard
              key={song?._id}
              songId={song?._id}
              artistId={song?.artist?.artistId}
              song={song}
              i={i}
              data={songsData}
              activeSong={activeSong}
              isPlaying={isPlaying}
            />)}
          </div>  
        </div>
      )
}

export default PlaylistRecommend
