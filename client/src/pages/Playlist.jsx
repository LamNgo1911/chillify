/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistResults from '../components/PlaylistResults.jsx';
import SongList from '../components/SongList.jsx';
import PlaylistRecommend from '../components/PlaylistRecommend.jsx';


function Playlist({auth}) {
  const navigate = useNavigate()
    const {id} = useParams()
    const {playlists, activeSong, isPlaying, recentSongs} = useSelector(state => state.player)
    const playlist = playlists?.filter(playlist => playlist.id === id)[0]
    const [search, setSearch] = React.useState('')
    const [isSearchResults, setIsSearchResults] = React.useState(true)

    useEffect(() => {
      setIsSearchResults(true)
      setSearch('')
    }, [id])

    !auth && navigate(`/login/${id}`)
    return (
    <div className='pb-8'>
        {/* header */}
      <div className='relative flex flex-row items-center gap-4 h-[60vh] animate-slidedown duration-300
      bg-gradient-to-b via-bgPlayerColorDark from-bgColor to-bgColor'>
        <MusicNoteIcon style={{fontSize:120}} className='border-2 border-[#4a4e69] rounded-full p-6 ml-4'/>
        <div className='flex flex-col gap-4'>
          <small className='font-semibold'>Playlist</small>
          <h1 className='text-[35px] md:text-[68px] font-bold'>{playlist?.name}</h1>
          <small  className='font-semibold'>Lamngo1911 . {playlist?.songs?.length} {playlist?.songs?.length > 1 ? 'songs' : 'song'}</small>
        </div>
      </div>
      {/* songlist */}
      {playlist?.songs?.length > 0 && (  
      <div className='flex flex-col gap-8 w-full mb-8 animate-slideup duration-300'>
          <div className='grid md:grid-cols-[3%,57%,20%,20%] grid-cols-[10%,80%,10%] justify-items-start px-4 md:px-8 font-bold '>
            <p className='text-xs md:text-base text-center'>#</p>
            <p className='text-xs md:text-base'>Title</p>
            <p className='text-xs hidden md:text-base md:block'>Type</p>  
            <p className='text-xs hidden md:text-base md:block'>Date Added</p>
          </div>

          <div className='flex flex-col animate-slideup duration-300'>
            {playlist?.songs?.map(({song, dateTime}, i) => (
              <SongList 
              key={i} 
              song={song}
              songId={song?._id}
              artistId={song?.artist?.artistId} 
              i={i} 
              data={playlist?.songs}
              recentSongs={recentSongs} 
              activeSong={activeSong} 
              isPlaying={isPlaying}
              isInPlaylist={true}
              playlist={playlist}
              dateTime={dateTime}
              />
            ))}
          </div>
      </div>)}
        {/* search */}
      <div 
      className={`flex-row justify-between items-center ${isSearchResults ? 'flex' : 'hidden'} 
      md:mx-8 mx-4 py-8 border-t border-bgColorLight animate-slideup duration-300`
      }
      >
         <div className='flex flex-col gap-4'>
            <h1 className='text-xl md:text-3xl font-bold'>Let's find something for your playlist</h1>   
            <form autoComplete="off" className=" text-textColor focus-within:text-textColorLight">
                <label htmlFor="search-field" className="sr-only">
                    Search all files
                </label>
                <div className=' flex items-center border w-full p-2 rounded-full'>
                    <SearchIcon style={{ fontSize: 30 }}/>
                    <input
                    autoComplete="off"
                    name='search-field'
                    value={search}
                    onChange={e => setSearch(e.target.value)} 
                    type="search" 
                    placeholder='Search' 
                    className='w-full h-4 p-2 border-none outline-none bg-transparent'
                    />
                </div>
            </form>
         </div>
         <CloseIcon onClick={() =>setIsSearchResults(false)} className='cursor-pointer' />
      </div>

      <PlaylistResults 
          search={search}
          setSearch={setSearch}
          isSearchResults={isSearchResults}
        />
      <PlaylistRecommend 
        isSearchResults={isSearchResults}
      />
    </div>
  )
}

export default React.memo(Playlist)