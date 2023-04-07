import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SongCard from '../components/SongCard';

import TopArtists from '../components/TopArtists';
import TopAlbums from '../components/TopAlbums';
import Loading from '../components/Loading';
import axios from '../api/axios';


const Home = ({activeSong, isPlaying, auth}) => {
  const navigate = useNavigate()

 
  const [allSongs, setAllSongs] = useState([])
  const [topChartSongs, setTopChartSongs] = useState([])
  const [songsYouMayLike, setSongsYouMayLike] = useState([])
  const [topAlbums, setTopAlbums] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  useEffect(() => {
    const getTopsongs = async () => {
     try {
      setIsFetching(true)
      const {data} = await axios.get('/chart/songs',
         {
        headers: {
            'Content-Type': 'application/json',
            },
          }
      )
      setIsFetching(false)
      // console.log(data?.data)
      setTopChartSongs(data?.data.slice(0,6))
      setSongsYouMayLike(data?.data.slice(6,12))
      setAllSongs(data?.data)
     } catch (error) {
      setIsFetching(false)
      console.log(error)
     }
    }
    const getTopAlbums = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get('/chart/albums',
            {
            headers: { 
              'Content-Type': 'application/json',
              },
            }
        )
        setIsFetching(false)
        // console.log(data?.data)
        setTopAlbums(data?.data)
      } catch (error) {
        setIsFetching(false)
        console.log(error)
      }
    }

    const getTopArtists = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get('/chart/artists',
            {
            headers: {
              'Content-Type': 'application/json',
              },
            }
        )
        setIsFetching(false)
        // console.log(data?.data)
        setTopArtists(data?.data)
      } catch (error) {
        setIsFetching(false)
        console.log(error)
      }
    }

    
    getTopsongs()
    getTopAlbums()
    getTopArtists()
  },[])

  return (
    isFetching ? <Loading /> : (
    <>
    {!auth && navigate('/login')}
   <div className='flex flex-col gap-8 lg:gap-0 lg:flex-row items-stretch bg-bgColor'>
      <div className='flex flex-col mt-20 md:mt-12 gap-8 px-8 w-full lg:w-[60%] ease-in duration-300'>
        {/* top navgations */}  
        <div className='w-full flex flex-row items-center justify-between'>
            <div className='flex flex-row'>
              <h2 className='text-base md:text-lg font-bold'>Music</h2> 
            </div>
        </div>
        {/* top songs*/}
        <div className='flex flex-col py-4 px-4 w-full text-sm md:text-base border border-bgColorLight rounded'>
            <div className='flex-1 flex flex-row justify-between items-center font-bold'>
              <h2 >Global Top 50</h2>
              <h2 className='cursor-pointer' onClick={() => setTopChartSongs(allSongs)}>See all</h2>
            </div>

            <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-8'>
              {topChartSongs?.map((song,i)=>
              <SongCard
                key={song._id}
                songId={song._id}
                artistId={song?.artist?.artistId}
                song={song}
                i={i}
                data={topChartSongs}
                activeSong={activeSong}
                isPlaying={isPlaying}
              />)}
            </div>  
        </div>
        {/* Songs you may like */}
        <div className='flex flex-col py-4 px-4 w-full text-sm md:text-base border border-bgColorLight lg:mb-8 rounded'>
            <div className='flex-1 flex flex-row justify-between items-center font-bold'>
              <h2>Songs You May Like</h2>
              <h2 className='cursor-pointer' onClick={() => setSongsYouMayLike(allSongs)}>See all</h2>
            </div>

            <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-8'>
              {songsYouMayLike?.map((song,i)=>
              <SongCard
                key={song._id}
                songId={song._id}
                artistId={song?.artist?.artistId}
                song={song}
                i={i}
                data={songsYouMayLike}
                activeSong={activeSong}
                isPlaying={isPlaying}
              />)}
            </div>
        </div>
      </div>
      {/* right sidebar */}
      <div className='lg:w-[40%] lg:border-l-[1px] lg:border-bgColorLight md:border-l-0'>
        <div className='relative flex flex-col w-full gap-8 mb-8 lg:pt-12 animate-slideright'>
          <TopArtists 
          data={topArtists}
          activeSong={activeSong} 
          isPlaying={isPlaying}
          />
          <TopAlbums 
            topAlbums={topAlbums} 
            activeSong={activeSong} 
            isPlaying={isPlaying} 
          /> 
        </div>  
      </div>
    </div>
   </>
  )
  )
}

export default Home