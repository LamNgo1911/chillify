/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BarWave from './BarWave';
import PlayAndLike from './PlayAndLike';



function SongList({song, i, data, activeSong, isPlaying, songId, artistId, isInPlaylist, dateTime}) {
  const [dateAdded, setDateAdded] = React.useState('')
  const navigate = useNavigate();
  const timeNow = new Date().getTime()
  let time = ''
  let second = ''
  let minute = ''
  let hour = ''
  let day = ''
 
 useEffect(() => {
  time = Math.floor((timeNow - dateTime)/1000).toFixed(0)
  second = (time%60).toFixed(0)
  minute = (time/60).toFixed(0)
  hour = (time/3600).toFixed(0)
  day =(time/86400).toFixed(0)

  if(day > 0){
    setDateAdded(`${day}d ago`)
  } else if(hour > 0){
    setDateAdded(`${hour}h ago`)
  } else if(minute > 0){
    setDateAdded(`${minute}m ago`)
  } else if(second >= 0){
    setDateAdded(`${second}s ago`)
  }
  }, [dateTime])

  return (
    <div className='relative'>
        <div className='group grid md:grid-cols-[3%,57%,20%,20%] grid-cols-[10%,80%,10%] 
        justify-items-start items-center py-2 px-4 md:px-8 hover:bg-slate-400 
        hover:bg-opacity-20 hover:rounded-xl'>
            {/* index */}
            <span 
            className={`w-4 group-hover:invisible 
            ${isPlaying && (activeSong?._id) 
            ===
            (song?._id) ? "invisible" : ""}`}>
                {i + 1}
            </span>
            {/* bar chart */}   
            <div  
            className={`${isPlaying && (activeSong?._id) 
            ===
            (song?._id) ? "visible" : "invisible"} 
            absolute md:left-6 left-3 group-hover:invisible`}>
                <BarWave />
            </div> 
            {/* song info */}
            <div className='flex flex-row gap-3 items-center'>
                <img src={song?.songImage} 
                alt="SongAvatar"  
                className='w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg cursor-pointer'
                onClick={() => {navigate(`/songs/${songId}`)}}
                />
                <div className='flex flex-col justify-center'>
                    <h2 
                    className='text-sm md:text-lg font-semibold hover:underline cursor-pointer'
                    onClick={() => {navigate(`/songs/${songId}`)}}
                    >
                      {song?.title}
                    </h2>
                    <p 
                    className='text-xs md:text-sm hover:underline cursor-pointer'
                    onClick={() => {navigate(`/artists/${artistId}`)}}
                    >
                      {song?.artist?.artistName}
                    </p>
                </div>
            </div>
            <p className='text-xs hidden md:text-sm md:block'>{song?.genre}</p>  
            <p className='text-xs hidden md:text-sm md:block'> {dateAdded}</p>
            {/* hover */}   
            <PlayAndLike 
              song={song}
              data={data}
              i={i}
              activeSong={activeSong} 
              isPlaying={isPlaying}
              isInPlaylist={isInPlaylist} 
              songId={songId}
            />
        </div>
    </div>
  )
}

export default SongList