/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from '../redux/features/playerSlice';
import { useNavigate, useParams } from 'react-router-dom';
import PlayAndLike from './PlayAndLike';
import BarWave from './BarWave';

const PlaylistCard = ({song, i, data, songId, activeSong, isPlaying, artistId}) => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { playlists} = useSelector(state => state.player)

  const handleAddClick = () => {
    const playlist = playlists?.filter(playlist => playlist?.id === id)[0]
    if(playlist){
      const isSong = playlist?.songs?.find(({song, dateTime}) =>song?._id === songId)
      if(!isSong) {
        const newPlaylist = {
          ...playlist,
          songs: [...playlist?.songs, {song: song, dateTime: new Date().getTime()}]
        }

        const newPlaylists = playlists?.map(playlist => playlist?.id === newPlaylist?.id ? newPlaylist : playlist)
        console.log(newPlaylists)
        dispatch(setPlaylists(newPlaylists))
      }
    }
  };

  return(
    <div className='hover:bg-slate-400 hover:bg-opacity-10 hover:rounded-xl'>
        <div className='relative group grid grid-cols-[10%,60%,30%] md:grid-cols-[3%,57%,40%] justify-items-start items-center py-2 md:px-8 px-4'>
          <span 
          className={`w-4 group-hover:invisible
          ${isPlaying && activeSong?._id
          ===
          song?.result?.id ? "invisible" : ""}`}>
              {i + 1}
          </span>
          {/* bar chart */}   
          <div  
          className={`${isPlaying && activeSong?._id
          ===
         ( song?.result?.id || song?.item?.id) ? "visible" : "invisible"} 
          absolute left-6 group-hover:invisible`}>
              <BarWave />
          </div>

          <div className='flex justify-center gap-2 items-center justify-self-start'>
            <img src={ song?.songImage} alt="songImage" className='md:w-12 md:h-12 h-10 w-10 rounded-lg object-contain'/>  
            <div className='flex flex-col justify-center gap-1'>
                <p className='hover:underline cursor-pointer text-base md:text-lg font-bold' onClick={() => navigate(`/songs/${songId}`)}>{song?.title}</p>
                <small 
                className='text-xs md:text-base'
                onClick={() => navigate(`/artits/${artistId}`)}
                >{song?.artist?.artistName}</small>
            </div>
          </div>
          <button 
          className='border border-bgColorLight md:px-4 px-2 py-1 text-sm md:text-base rounded-full hover:scale-105 justify-self-start md:justify-self-center'
          onClick={handleAddClick}
          >
              Add
          </button>
          {/* play button */}
          <PlayAndLike  
              song={song}
              data={data}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              songId={songId}
          />
        </div>
    </div>
  )
}

export default PlaylistCard