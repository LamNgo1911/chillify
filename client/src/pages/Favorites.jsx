import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SongList from '../components/SongList';


function Favorites({auth}) {
  const navigate = useNavigate()
  const {favoriteSongs, recentSongs, activeSong, isPlaying} = useSelector(state => state.player)
  
  !auth && navigate('/favorites')
  return (
    <div>
      <div className='relative flex flex-row items-center gap-4 h-[60vh] animate-slidedown duration-300
      bg-gradient-to-b via-bgPlayerColorDark from-bgColor to-bgColor'>
        <FavoriteIcon style={{fontSize:100}} className='border-2 border-[#4a4e69] rounded-full p-6 ml-4'/>
        <div className='flex flex-col gap-4'>
          <small className='font-semibold'>Playlist</small>
          <h1 className='text-[25px] sm:text-[48px] md:text-[60px] font-bold'>Your Favorite Songs</h1>
          <small  className='font-semibold'>Lamngo1911 . {favoriteSongs?.length} {favoriteSongs?.length > 1 ? 'songs' : 'song'}</small>
        </div>
      </div>

      {favoriteSongs?.length === 0 ? 
      <div className='text-center flex flex-col justify-center items-center h-[50vh] gap-4 px-4 animate-slideup duration-300'>
          <h1 className='text-2xl md:text-3xl font-bold'>Songs you like will appear here</h1>
          <p className='text-base md:text-lg font-semibold'>Save songs by tapping the heart icon.</p>
          <button 
          className='text-sm md:text-base font-bold px-6 py-4 rounded-full bg-bgColorLighter text-white hover:scale-105'
          onClick={() => navigate('/search')}
        >Find Songs</button>
      </div>
      :
      <div className='flex flex-col gap-8 w-full animate-slideup duration-300'>
          <div className='grid md:grid-cols-[3%,57%,20%,20%] grid-cols-[10%,80%,10%] justify-items-start px-4 md:px-8 font-bold '>
            <p className='text-xs md:text-base text-center'>#</p>
            <p className='text-xs md:text-base'>Title</p>
            <p className='text-xs hidden md:text-base md:block'>Type</p>  
            <p className='text-xs hidden md:text-base md:block'>Date Added</p>
          </div>

          <div className='flex flex-col animate-slideup duration-300 pb-8'>
            {favoriteSongs?.map(({song, dateTime}, i) => (
              <SongList 
              key={i} 
              song={song}
              songId={song?._id} 
              artistId={song?.artist?.artistId}
              i={i} 
              data={favoriteSongs}
              recentSongs={recentSongs} 
              activeSong={activeSong} 
              isPlaying={isPlaying}
              title='Favorite Songs'
              dateTime={dateTime}
              />
            ))}
          </div>
      </div>
      }

    </div>
  )
}

export default React.memo(Favorites)