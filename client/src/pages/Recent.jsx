import React from 'react'
import UpdateIcon from '@mui/icons-material/Update';
import SongList from '../components/SongList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Recent = ({auth}) => {
  const {recentSongs, activeSong, isPlaying} = useSelector(state => state.player)
  const navigate = useNavigate()
  console.log(recentSongs)
  
  !auth && navigate('/recent')
  return (
    <div className='pb-8'>
      <div className='relative flex flex-row items-center gap-4 h-[60vh] animate-slidedown duration-300
      bg-gradient-to-b via-bgPlayerColorDark from-bgColor to-bgColor'>
        <UpdateIcon style={{fontSize:100}} className='border-2 border-[#4a4e69] rounded-full p-6 ml-4'/>
        <div className='flex flex-col gap-4'>
          <small className='font-semibold'>Playlist</small>
          <h1 className='text-[25px] sm:text-[48px] md:text-[60px] font-bold'>Recent Played</h1>
          <small  className='font-semibold'>Lamngo1911 . {recentSongs?.length} {recentSongs?.length > 1 ? 'songs' : 'song'}</small>
        </div>
      </div>

      {recentSongs?.length === 0 ? 
      <div 
        className='text-center flex flex-col justify-center items-center h-[50vh] gap-4 px-4 animate-slideup duration-300'>
        <h1 className='text-2xl md:text-3xl font-bold'>Songs that you recently played will appear here</h1>
        <button 
          className='text-sm md:text-base font-bold px-6 py-4 rounded-full bg-bgColorLighter hover:scale-105'
          onClick={() => navigate('/search')}
        >
        Find Songs
        </button>
      </div> 
      :
      <div className='flex flex-col gap-8 w-full animate-slideup duration-300'>
          <div className='grid md:grid-cols-[3%,57%,20%,20%] grid-cols-[10%,80%,10%] justify-items-start px-4 md:px-8 font-bold '>
            <p className='text-xs md:text-base text-center'>#</p>
            <p className='text-xs md:text-base'>Title</p>
            <p className='text-xs hidden md:text-base md:block'>Type</p>  
            <p className='text-xs hidden md:text-base md:block'>Date Added</p>
          </div>
          <div className='flex flex-col animate-slideup duration-300'>
            {recentSongs?.map(({song, dateTime}, i) => (
              <SongList 
                key={i} 
                song={song}
                songId={ song?._id}
                artistId={song?.artist?.artistId}
                i={i} 
                data={recentSongs}
                recentSongs={recentSongs} 
                activeSong={activeSong} 
                isPlaying={isPlaying}
                dateTime={dateTime}
                title='Recent Played' 
                />
            ))}
          </div>
      </div>
    }
      
    </div>
  )
}

export default React.memo(Recent)