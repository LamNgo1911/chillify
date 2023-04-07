/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPlaying, setActiveSong, setPlaylists, setIsAdded, setIsRemoved } from '../redux/features/playerSlice';
import CloseIcon from '@mui/icons-material/Close';
import { 
  removeFavoriteSongs, 
  setFavoriteSongs,
  setRecentSongs,
  removeRecentSongs
   } from '../redux/features/playerSlice';
import { useParams } from 'react-router-dom';


function PlayAndLike({song, data, i, activeSong, isPlaying, isInPlaylist, songId}) {
  const dispatch = useDispatch()
  const {id} = useParams()
  const { playlists, favoriteSongs} = useSelector(state => state.player)
  const handleRemoveClick = () => {
    const playlist = playlists?.filter(playlist => playlist?.id === id)[0]
    console.log(playlist)
    if(playlist){
      const newPlaylist = {
        ...playlist,
        songs: playlist?.songs?.filter(({song}) => song?._id !== songId)

      }
      const newPlaylists = playlists?.map(playlist => playlist?.id === newPlaylist?.id ? newPlaylist : playlist)
      dispatch(setPlaylists(newPlaylists))
    }
  };
  const index = favoriteSongs?.findIndex(({song}) => song?._id === songId)

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
  

  return (
    <>
        {/* play and pause */}
        {isPlaying && 
        (activeSong?._id  === song?._id) ?
          <PauseIcon 
            style={{fontSize:35}} 
            className='cursor-pointer text-bgColorLighter absolute md:left-4 left-1 invisible group-hover:visible'
            onClick={handlePauseClick} 
          />
          :
          <PlayArrowIcon 
            style={{fontSize:35}} 
            className='cursor-pointer text-bgColorLighter absolute md:left-4 left-1 invisible group-hover:visible' 
            onClick={handlePlayClick}
          />
        }
        {/* close button */}
        {isInPlaylist && <CloseIcon 
        className='cursor-pointer text-bgColorLighter absolute md:right-6 right-3 invisible group-hover:visible'
        onClick={handleRemoveClick} 
        />}
        {/* favorite button */}
        {!isInPlaylist && ( 
          favoriteSongs[index]?.isFavorite
           ?
        <FavoriteIcon 
        style={{fontSize:25}} 
        className='cursor-pointer text-bgColorLighter absolute md:right-6 right-3 invisible group-hover:visible'
        onClick={handleUnFavoriteClick} 
        />
        :
        <FavoriteBorderIcon 
          style={{fontSize:25}} 
          className='cursor-pointer text-bgColorLighter absolute md:right-6 right-3 invisible group-hover:visible'
          onClick={handleFavoriteClick} 
        />
          
        )}
    </>
  )
}

export default PlayAndLike
