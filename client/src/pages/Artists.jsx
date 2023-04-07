/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from '../api/axios';


const Artist = ({artist,artistId}) =>{
  const navigate = useNavigate();

  return (
    <div className='border flex flex-col w-[125px] md:w-[170px] p-3 bg-bgColorLight
    bg-opacity-20 backdrop-blur-sm animate-slideup rounded-lg border-bgColorLight cursor-pointer hover:bg-slate-400 hover:bg-opacity-20'
    onClick={() => navigate(`/artists/${artistId}`)}
    >
      <div className='relative'>
        <img 
          src={artist?.artistImage} alt="Artist"
          className='self-center w-full rounded-lg object-contain' 
         />
      </div>
      <p 
      className='text-base font-semibold mt-4 mb-1 hover:underline'
      >
        {artist?.artistName}
      </p>
    </div>
  )
}

function Artists({auth}) {
  const [artistsData, setArtistsData] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false)
  const navigate = useNavigate();

  !auth && navigate('/artists')
  useEffect(() => {
      setIsFetching(true)
      const getArtists = async () => {
        try {
          setIsFetching(true)
          const {data} = await axios.get('/chart/artists')
          setArtistsData(data?.data)
          setIsFetching(false)
        } catch (error) {
          setIsFetching(false)
          console.log(error)
        }
      }
      getArtists()
  }, [])
 
  return (
    <>
      {isFetching ? <Loading /> : (
        <div className='flex flex-col mt-20 md:mt-12 gap-8 px-8 pb-8 w-full ease-in duration-300'>
        {/* top navgations */}
        <div className='w-full flex flex-row items-center justify-between'>
            <div className='flex flex-row'>
              <h2 className='text-base md:text-lg font-bold'>Artists</h2>
            </div>
        </div>
        {/* top Artists */}
        <div className='flex flex-wrap justify-center md:justify-start gap-4'>
          {artistsData?.map((artist,i) =>{
            return (
            <Artist
              key={artist?._id}
              artist={artist}
              artistId={artist?._id}
            />)
          })}
        </div>
    </div>
      )}
  </>
  )
}

export default React.memo(Artists)