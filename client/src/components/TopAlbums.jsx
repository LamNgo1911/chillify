/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom';


const TopAlbum = ({album, artistId,albumId}) => {
    const navigate = useNavigate();
   
    return (
        <div className='relative'>
            <div className='group flex flex-row justify-between items-center py-2 px-8 
            hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-xl animate-slideright duration-300'>
                <div className='flex items-center gap-4'>
                    {/* album */}
                    <div className='flex flex-row gap-3 items-center'>
                        <img 
                        src={album?.albumImage} alt="album"  
                        className='w-10 h-10 md:w-12 md:h-12 object-fit rounded-lg cursor-pointer'
                        onClick={() => navigate(`/albums/${albumId}`)}
                        />
                        <div className='flex flex-col justify-center'>
                            <h2 
                            className='text-sm md:text-base font-semibold cursor-pointer hover:underline'
                            onClick={() => navigate(`/albums/${albumId}`)} 
                            >
                                {album?.albumName}
                            </h2>
                            <p 
                            className='text-xs md:text-sm cursor-pointer hover:underline'
                            onClick={() => navigate(`/artists/${artistId}`)}>
                                {album?.artist?.artistName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)}


const TopAlbums = ({topAlbums, activeSong, isPlaying}) => {

  return (
      <div className='flex flex-col w-full gap-8'>
        <div className='flex-1 flex flex-row justify-between items-center font-bold px-8'>
          <h2 className='text-base md:text-lg'>Top Albums</h2>
        </div>

        <div className='flex flex-col'>
            {topAlbums?.map((album, i) => (
                <TopAlbum 
                key={i} 
                album={album} 
                activeSong={activeSong} 
                isPlaying={isPlaying} 
                index={i} 
                artistId={album?.artist?.artistId} 
                albumId={album?._id}/>

            ))}
        </div>
  </div>
  )
}

export default TopAlbums