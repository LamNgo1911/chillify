
import React, { useRef, useEffect } from 'react'
import {url} from "../../api/axios"

function Player({activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat}) {
  const ref = useRef(null)


  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    }
    else {
      ref.current.pause();
    }
  }
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);
  
 
  return (
    <audio
      src={activeSong?.songUrl ? `${url}/chart/stream/${activeSong.songUrl}` : ''}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  )
}

export default Player