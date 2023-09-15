
import React, { useRef, useEffect } from 'react'
import {url} from "../../api/axios"
console.log(url, "hello")

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
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
   if(ref.current){
    ref.current.currentTime = seekTime;
   }
    
    console.log('seekTime', seekTime);
    console.log('ref.current.currentTime', ref.current.currentTime);
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