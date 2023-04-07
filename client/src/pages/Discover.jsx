/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import SongCard from '../components/SongCard';

import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


const Discover = ({auth}) => {
  const navigate = useNavigate()
  const [currentvalue, setCurrentvalue] = React.useState('All')
  const [songsData, setSongsData] = React.useState([])
  const {activeSong, isPlaying} = useSelector(state => state.player)
  const [isFetching, setIsFetching] = React.useState(false)

  useEffect(() => {
    const getGenreSongs = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get(`chart/songs?genre=${currentvalue}`)
        setIsFetching(false)
        setSongsData(data?.data)
        // console.log(data?.data)
      } catch (error) {
        setIsFetching(false)
        console.log(error)
      }

    }
    getGenreSongs() 
  }, [currentvalue]) 
  
  !auth && navigate('/discover')
  return (
    <>
      {isFetching ? <Loading /> :
      <div className='flex flex-col mt-20 md:mt-12 gap-8 px-8 pb-8 w-full ease-in duration-300'>
      {/* top navgations */}
      <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row'>
            <h2 className='text-base md:text-lg font-bold'>Discover {currentvalue}</h2>
          </div>
          <div>
              <select 
              value={currentvalue}
              className='text-sm md:text-base font-bold border-none outline-none bg-bgColor text-textColor'
              onChange={(e) => {setCurrentvalue(e.target.value)}}>
                <option value="All">All</option>
                <option value="Rap" >Rap</option>
                <option value="Pop" >Pop</option>
                <option value="Rb" >Rb</option>
                <option value="Rock" >Rock</option>
                <option value="Country" >Country</option>
              </select>
          </div>
      </div>
      {/* top songs*/}
      {songsData?.length > 0 ? 
        <div className='flex flex-wrap justify-center md:justify-start gap-4'>
          {songsData?.map((song,i)=>
          <SongCard
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
        : <div className='flex flex-col items-center justify-center w-full h-[80vh]'>
          <h1 className='text-2xl font-bold'>No songs found</h1>
        </div> 
        }
    </div>}
    </>
  )
}

export default React.memo(Discover)