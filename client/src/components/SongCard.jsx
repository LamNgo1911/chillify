/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import PlayAndPause from './PlayAndPause';



function SongCard({data, song, i, isPlaying, activeSong, songId, artistId}) {
  const navigate = useNavigate()
  return (
    <div className='border group/item flex flex-col w-[125px] md:w-[170px] p-3 bg-bgColorLight
      bg-opacity-20 backdrop-blur-sm animate-slideup rounded-lg border-bgColorLight cursor-pointer hover:bg-slate-400 hover:bg-opacity-20 '
      >
        <div className='relative'>
          <img 
            src={song?.songImage} 
            alt="Song-display" 
            className='self-center w-full rounded-lg object-fit border border-bgColorLight hover:scale-105' 
            onClick={() => navigate(`/songs/${songId}`)}/>
             {/* hover */}
             <div 
            className='absolute bottom-2 right-2 justify-center items-center hidden group-hover/item:flex'
            > 
              <PlayAndPause 
              song={song}
              songId={songId}
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data}
              i={i}
              />
            </div>
        </div>
        <p 
        className='text-base font-semibold mt-4 mb-1 hover:underline' 
        onClick={() => navigate(`/songs/${songId}`)}>
          {song?.title}
        </p>
        <small className='text-sm hover:underline' onClick={() => navigate(`/artists/${artistId}`)}>
          {song?.artist?.artistName}
        </small>
    </div>
  )
}

export default SongCard