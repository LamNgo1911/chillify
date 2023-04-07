/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import PauseIcon from '@mui/icons-material/Pause';
import { setIsPlaying, setActiveSong, setRecentSongs, removeRecentSongs, setFavoriteSongs, setIsAdded, removeFavoriteSongs, setIsRemoved } from '../redux/features/playerSlice'
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



function DetailsHeader({artistDetails, albumDetails, songDetails, song, data, i, activeSong, isPlaying, likedButton, songId}) {

  const dispatch = useDispatch()
  const {favoriteSongs} = useSelector(state => state.player)

  const handlePauseClick = () => {
    dispatch(setIsPlaying(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(setIsPlaying(true));
    dispatch(setRecentSongs(song))
    dispatch(removeRecentSongs())
  };

  const handleFavoriteClick = () => {
    dispatch(setFavoriteSongs(song))
    dispatch(setIsAdded(true))
  }
  const handleUnFavoriteClick = () => {   
    dispatch(removeFavoriteSongs(song))
    dispatch(setIsRemoved(true))

  }

  const index = favoriteSongs?.findIndex(({song}) => (song?._id === songId))


  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-4 px-8 h-[60vh] 
      bg-gradient-to-b via-bgPlayerColorDark from-bgColor to-bgColor animate-slidedown duration-300'>
        <img src={artistDetails?.artistImage || albumDetails?.albumImage || songDetails?.songImage} alt="ArtistPhoto" 
            className='md:h-32 md:w-32 h-16 w-16 border border-bgColorLight object-contain rounded-full' />
          <div className='flex flex-col gap-4'>
            <h2 className='font-bold text-base sm:text-lg md:text-2xl'>{artistDetails?.artistName || albumDetails?.albumName || songDetails?.title}</h2>
            <p className='text-xs sm:text-sm md:text-lg'>{albumDetails?.artist?.artistName || songDetails?.genre || song?.genre}</p>
          </div>
      </div>
      {/* content */} 
      <div className='px-8 flex gap-8'>
        {/* play buttons */}
        {isPlaying && (activeSong?.title === song?.title) ?
          <PauseIcon 
          style={{fontSize:45}}
          className='cursor-pointer text-bgColorLighter border-bgColorLighter border-2 rounded-full hover:scale-105'
          onClick={handlePauseClick}
          />
          :
          <PlayArrowIcon 
          style={{fontSize:45}}
          className='cursor-pointer text-bgColorLighter border-bgColorLighter border-2 rounded-full hover:scale-105'
          onClick={handlePlayClick}
          />
        }
        {/* like buttons */}
        {likedButton &&
          (
            favoriteSongs[index]?.isFavorite ? 
            <FavoriteIcon 
              style={{fontSize:45}} 
              className='cursor-pointer text-bgColorLighter border-bgColorLighter hover:scale-105'
              onClick={handleUnFavoriteClick} 
            />
            :
            <FavoriteBorderIcon 
              style={{fontSize:45}} 
              className='cursor-pointer text-bgColorLighter border-bgColorLighter hover:scale-105'
              onClick={handleFavoriteClick} 
            />
          )
        }
      </div>
    </div>
  )
}

export default DetailsHeader