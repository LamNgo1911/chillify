import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Track from './Track';
import Controls from './Controls';
import SeekBar from './Seekbar';
import Volumebar from './Volumebar';
import { setIsPlaying, nextSong, previousSong, shuffleSong} from '../../redux/features/playerSlice';
import Player from './Player';

function Songbar() {
  const dispatch = useDispatch()
  const {currentSongs, currentIndex, isActive, activeSong, isPlaying} = useSelector(state => state.player)
// volume bar
  const [volume, setVolume] = useState(0.5)
// controls
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
// seekbar
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [appTime, setAppTime] = useState(0)
 
  useEffect(() => {
    if(currentSongs.length) dispatch(setIsPlaying(true))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[currentIndex])

  const handlePlayPause = () =>{
    if(!isActive) return

    if(isPlaying){
      dispatch(setIsPlaying(false))
    }
    else{
      dispatch(setIsPlaying(true))
    }
  }

  const handleNextSong = () =>{
    dispatch(nextSong())
  }

  const handlePrevSong = () =>{
    dispatch(previousSong())
  }

  const handleShuffleSong = () =>{
    setShuffle(pre => !pre)
    if(shuffle) dispatch(shuffleSong())
  }


  return (
  
      <div 
      className={`sm:px-4 w-full z-[100] bottom-0 sm:grid-cols-3 grid-cols-2 py-4 px-2
        opacity-90 animate-slideup
      bg-bgColorDark bg-opacity-80 backdrop-blur-lg rounded-t-3xl rounded-lg
      ${isActive ? "grid" : "hidden"}`}>
          <Track activeSong={activeSong} isActive={isActive} isPlaying={isPlaying}  />
          <div className='flex flex-col justify-center items-center gap-2 justify-self-end'>
            <Controls
              currentSongs={currentSongs}
              activeSong={activeSong}
              currentIndex={currentIndex}
              isActive={isActive}
              isPlaying={isPlaying}
              repeat={repeat}
              setRepeat={setRepeat}
              shuffle={shuffle}
              setShuffle={setShuffle}
              shuffleSong={shuffleSong}
              handleNextSong={handleNextSong}
              handlePlayPause={() =>handlePlayPause()}
              handlePrevSong={() =>handlePrevSong()}
              handleShuffleSong={() =>handleShuffleSong()}
            />
            <SeekBar 
              min="0"
              max={duration}
              value={appTime}
              onChange={event => setSeekTime(event.target.value)}
              appTime={appTime}
            />
            <Player 
              activeSong={activeSong}
              volume={volume}
              isPlaying={isPlaying}
              seekTime={seekTime}
              repeat={repeat}
              currentIndex={currentIndex}
              onEnded={handleNextSong}
              onTimeUpdate={event => setAppTime(event.target.currentTime)}
              onLoadedData={event => setDuration(event.target.duration)}
            />
          </div>
          <Volumebar
            value={volume}
            min="0"
            max="1"
            onChange={event => setVolume(event.target.value)}
            setVolume={setVolume}
          />
      </div>
  )
}

export default React.memo(Songbar)