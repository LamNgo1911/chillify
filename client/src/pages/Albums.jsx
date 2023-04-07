import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from '../api/axios';

const Album = ({album, artistId, albumId}) => {
    const navigate = useNavigate();

    return (
      <div className='border group/item flex flex-col w-[125px] md:w-[170px] p-3 bg-bgColorLight
      bg-opacity-20 backdrop-blur-sm animate-slideup rounded-lg border-bgColorLight cursor-pointer hover:bg-slate-400 hover:bg-opacity-20 '
      >
        <div className='relative'>
          <img 
            src={album?.albumImage} 
            alt="Song-display" 
            className='self-center w-full rounded-lg object-contain' onClick={() => navigate(`/albums/${albumId}`)}/>
        </div>
        <p 
        className='text-base font-semibold mt-4 mb-1 hover:underline' 
        onClick={() => navigate(`/albums/${albumId}`)}>
          {album?.albumName}
        </p>
        <small className='text-sm hover:underline' onClick={() => navigate(`/artists/${artistId}`)}>
          {album?.artist?.artistName}
        </small>
    </div>
)}


const Albums = ({auth}) => {
  const [topAlbums, setTopAlbums] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const getTopAlbums = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get('/chart/albums')
        setTopAlbums(data?.data)
        setIsFetching(false)
      } catch (error) {
        console.log(error)
      }
    }
    getTopAlbums()
  }, [])
      
 
  !auth && navigate('/albums')
  return (
    <>
      {isFetching ? <Loading /> : (
        <div className='flex flex-col mt-20 md:mt-8 gap-8 px-8 mb-8 w-full ease-in duration-300'>
        {/* top navgations */}
          <div className='w-full flex flex-row items-center justify-between'>
              <div className='flex flex-row'>
                <h2 className='text-base md:text-lg font-bold'>Albums</h2>
              </div>
          </div>

          <div className='flex flex-wrap justify-center md:justify-start gap-4'>
              {topAlbums?.map((album, i) => (
                  <Album 
                  key={i} 
                  album={album} 
                  index={i} 
                  artistId={album?.artist?.artistId} 
                  albumId={album?._id}/>
              ))}
          </div>
       </div>
      )}
    </>
  )
}

export default React.memo(Albums)