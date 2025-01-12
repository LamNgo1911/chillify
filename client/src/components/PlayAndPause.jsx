/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useDispatch } from 'react-redux';
import { setIsPlaying, setActiveSong} from '../redux/features/playerSlice';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { 
  setRecentSongs,
  removeRecentSongs,
   } from '../redux/features/playerSlice';

function PlayAndPause({song, data, i, activeSong, isPlaying, songId }) {
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(setIsPlaying(false));
  };

  const handlePlayClick = () => {
    // active song
    dispatch(setRecentSongs(song))
    dispatch(setActiveSong({ song, data, i }));
    dispatch(setIsPlaying(true));
    dispatch(removeRecentSongs())
    
  };

  return (
    <>
        {isPlaying && (activeSong?._id === songId) ?
        <PauseIcon 
        style={{fontSize:32}}
        className='cursor-pointer bg-bgPlayerColorLight 
        rounded-lg hover:scale-105 ease-in duration-150'
        onClick={() => handlePauseClick()}
        data-testid="pause-icon"
       
        />
        :
        <PlayArrowIcon 
        style={{fontSize:32}}
        className='cursor-pointer bg-bgPlayerColorLight 
        rounded-lg hover:scale-105 ease-in duration-150'
        onClick={() => handlePlayClick()} 
        data-testid="play-icon"
        />
        }
    </>
  )
}

export default PlayAndPause
