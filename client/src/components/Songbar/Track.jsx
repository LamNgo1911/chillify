import React from 'react'

function Track({activeSong, isActive, isPlaying}) {

  let songTitle = activeSong?.title
  if(songTitle?.includes("(")){
    songTitle = songTitle?.substring(0, songTitle.indexOf("("))
  }

  return (
    <div className='flex sm:gap-4 gap-2 items-center justify-self-start'>
        <img src={activeSong?.songImage} 
        alt="SongImage" 
        className={`lg:w-16 lg:h-16 w-8 h-8 rounded-full border object-contain 
        ${(isActive && isPlaying) ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
        <div className='flex flex-col items-start gap-2'>
            <h3 className='text-[13px] md:text-base font-semibold'>{activeSong ? activeSong?.title  : "No active Song"}</h3>
            <p className='text-[10px] md:text-sm'>{activeSong ? activeSong?.artist?.artistName : "No active Song"} </p>
        </div>
    </div>
  )
}

export default Track