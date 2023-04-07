import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleIcon from '@mui/icons-material/Shuffle';

function Controls({
   isActive, isPlaying, repeat, setRepeat, shuffle,
  handleNextSong, handlePlayPause, handlePrevSong, handleShuffleSong}) {

  return (
    <div className='flex flex-row flex-nowrap items-center gap-1 sm:gap-2 lg:gap-8 md:gap-4'>
        <RepeatIcon 
          fontSize='small' 
          className={`cursor-pointer hover:scale-105 ease-in duration-150  ${repeat ? "text-bgColorLighter" : ""}`} 
          onClick={() => setRepeat(pre => !pre)}/>
        <ArrowBackIosIcon 
          fontSize='small' 
          className='cursor-pointer hover:scale-105 ease-in duration-150' 
          onClick={() => handlePrevSong()}/>
        <div className='
        hover:scale-105 ease-in duration-150 cursor-pointer rounded-lg bg-bgColorLighter'>
          {(isActive && isPlaying) ?  
          <PauseIcon 
          style={{fontSize:32}}
            className='cursor-pointer hover:scale-105 ease-in duration-150'
            onClick={handlePlayPause}
          /> : 
          <PlayArrowIcon
          style={{fontSize:32}}
          className='cursor-pointer hover:scale-105 ease-in duration-150'
          onClick={handlePlayPause}
          />
          }
        </div>
        <ArrowForwardIosIcon 
          fontSize='small' 
          className='cursor-pointer hover:scale-105 ease-in duration-150' 
          onClick={() => handleNextSong()}/>
        <ShuffleIcon 
          fontSize='small' 
          className={`cursor-pointer hover:scale-105 ease-in duration-150 ${shuffle ? "text-bgColorLighter" : ""}`} 
          onClick={() => handleShuffleSong()}/>
    </div>
  )
}

export default Controls