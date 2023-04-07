/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import PlayAndLike from './PlayAndLike';
import BarWave from './BarWave';

const RelatedSong = ({song, i, data, songId, artistId, activeSong, isPlaying, title}) => {
  const navigate = useNavigate();
  return(
    <div 
    className='relative group flex flex-row gap-4 py-2 items-center
  hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-xl px-8'
    >
      <span 
      className={`w-4 group-hover:invisible 
      ${isPlaying && (activeSong?._id
      ===
      song?._id) ? "invisible" : ""}`}>
          {i + 1}
      </span>
      {/* bar chart */}   
      <div  
      className={`${isPlaying && (activeSong?._id 
      ===
      song?._id) ? "visible" : "invisible"} 
      absolute left-6 group-hover:invisible`}>
          <BarWave />
      </div>

      <img src={song?.songImage} 
      alt="songImage" className='w-12 h-12 rounded-lg object-contain cursor-pointer'
      onClick={() => navigate(`/songs/${songId}`)}
      />
      <div className='flex flex-col justify-center gap-1'>
          <p className='hover:underline cursor-pointer' onClick={() => navigate(`/songs/${songId}`)}>{song?.title}</p>
          <small className={`${title !== "Related Songs:" ? "hover:underline cursor-pointer" : ""}`} 
          onClick={() => navigate(`/artists/${artistId}`)}>
            {song?.artist?.artistName}
          </small>
      </div>
      {/* play button */}
      <PlayAndLike  
        song={song}
        songId={songId}
        data={data}
        i={i}
        activeSong={activeSong}
        isPlaying={isPlaying}
      />
    </div>
  )
}

function RelatedSongs({data, activeSong, isPlaying, title}) {
  return (
    <div className='flex flex-col animate-slideup duration-300'>
        <h2 className='text-lg md:text-2xl font-bold pb-8 px-8'>{title}</h2>
        {data?.map((song,i) => 
        <RelatedSong 
          key={song._id} 
          song={song} 
          i={i} 
          data={data}
          activeSong={activeSong}
          isPlaying={isPlaying}
          songId={ song?._id}
          artistId={song?.artist?.artistId}
          title={title}  
        />)}
    </div>
  )
}

export default RelatedSongs