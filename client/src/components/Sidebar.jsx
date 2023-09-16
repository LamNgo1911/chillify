/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import AlbumIcon from '@mui/icons-material/Album';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import UpdateIcon from '@mui/icons-material/Update';
import FavoriteIcon from '@mui/icons-material/Favorite';

import AddBoxIcon from '@mui/icons-material/AddBox';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import CloseIcon from '@mui/icons-material/Close';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreated, setPlaylists } from '../redux/features/playerSlice';
import { setAuth, setUser } from '../redux/features/auth';
import Message from './Message';

const NavigationLink = ({icon, name, url, setOpenMobile}) =>{
  return (
      <div className={`flex flex-row gap-3 hover:text-textColorLight sm:text-base text-sm font-medium
       hover:scale-x-105 ease-in duration-150 ${icon === <LibraryBooksIcon /> ? '' : 'cursor-pointer'}`} 
      >
          <NavLink to={url} className="flex flex-row items-center gap-2"  onClick={() => setOpenMobile(false)}>
              {icon} {name}
          </NavLink>
      </div>
  )
}

const NavLinks = ({setOpenMobile}) =>{
  const {playlists} = useSelector(state => state.player)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [points, setPoints] = useState({x: 0, y: 0})

  const handCreatePlaylist = () => {
    dispatch(setPlaylists([...playlists, {
      name: `Playlist ${playlists.length + 1}`, 
      songs: [], clicked: false, 
      id: uuidv4()}
    ]))
    dispatch(setIsCreated(true))
  }
  // console.log('playlists: ', playlists)
  useEffect(() => {
    const handleClick = (e) => {
      if(e.target.className !== 'message'){
        const newPlaylists = playlists.map((item) => {
          return {...item, clicked: false}
        })
        dispatch(
          setPlaylists(
            newPlaylists
            )
        )
      }
    }
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [playlists])

  const handleLogout = () => {
    dispatch(setAuth(false))
    dispatch(setUser({}))
    navigate("/login")
  }
  return (
    <div className='flex flex-col py-4'>
        {/* Menu */}
        <h2 className='text-xl font-bold sm:text-2xl'>MENU</h2>
        <div  className='flex flex-col gap-4 pt-4'>
          <NavigationLink setOpenMobile={setOpenMobile}  icon={<HomeIcon />} name="Home" url="/"/>
          <NavigationLink setOpenMobile={setOpenMobile} icon={<SearchIcon />} name="Search"  url="/search"/>
          <NavigationLink setOpenMobile={setOpenMobile} icon={<ExploreIcon />} name="Discover" url="/discover"/>
          <NavigationLink setOpenMobile={setOpenMobile} icon={<AlbumIcon />} name="Albums" url="/albums"/>
          <NavigationLink setOpenMobile={setOpenMobile} icon={<PeopleAltIcon />} name="Artists" url="/artists"/>
        </div>
        {/* Library */}
        <h2 className='mt-8 text-xl font-bold sm:text-2xl'>LIBRARY</h2>
  
        <div className='flex flex-col gap-4 pt-4'>
          <NavigationLink setOpenMobile={setOpenMobile} icon={<UpdateIcon />} name="Recent" url="/recent"/>
          <NavigationLink setOpenMobile={setOpenMobile} icon={<FavoriteIcon />} name="Favorites" url="/favorites"/>
           {/* Playlist */}
          <div 
            className={`flex flex-row gap-3 sm:text-base text-sm font-medium
             hover:text-textColorLight hover:scale-x-105 ease-in duration-150 cursor-pointer 
            `}
            onClick={() => handCreatePlaylist()}
          >
            <div className="flex flex-row items-center gap-2">
              <AddBoxIcon className='sidebar'/> Create Playlist
            </div>
          </div>
          {playlists?.map((playlist, i) => 
            (<div key={i}>
                <div
                  onContextMenu={(e) => {
                  e.preventDefault()
                  setPoints({x: e.pageX, y: e.pageY})
                  const newPlaylists = playlists.map((item) => {
                    if(item?.id === playlist?.id){
                      return {...item, clicked: true}
                    }else{
                      return {...item, clicked: false}
                    }
                  })
                  dispatch(
                    setPlaylists(
                      newPlaylists
                      )
                  )
                }}
                >
                  <NavigationLink 
                    setOpenMobile={setOpenMobile} 
                    key={playlist?.id} 
                    icon={<LibraryBooksIcon />} 
                    name={playlist?.name} 
                    url={`/playlist/${playlist?.id}`}
                  />
                </div>
                <Message 
                  clicked={playlist?.clicked} 
                  key={playlist?.name} 
                  points={points} 
                  playlist={playlist}  
                  playlists={playlists}
                />
              </div>
              )
            )}
        </div>
        {/* General */}
        <h2 className='mt-8 text-xl font-bold sm:text-2xl'>SETTINGS</h2>
        <div  className='flex flex-col gap-4 pt-4 mb-10'>
          <NavigationLink setOpenMobile={setOpenMobile} icon={<SettingsIcon />} name="Settings" url="/settings"/>
          <div className={`flex flex-row gap-3 hover:text-textColorLight sm:text-base text-sm font-medium
            hover:scale-x-105 ease-in duration-150 cursor-pointer`} 
            >
                <NavLink className="flex flex-row items-center gap-2"  onClick={handleLogout}>
                  < LogoutIcon /> Log Out
                </NavLink>
            </div>
        </div>
    </div>
  )
}


const Sidebar = () => {
  const [openMobile, setOpenMobile] = useState(false)

  return (
    <div>
      {/* web */}
      <div className='hidden relative md:flex flex-col py-8 pb-48 px-8 hide-scrollbar h-[100vh] overflow-y-scroll
      bg-gradient-to-r from-bgColorDarker to-bgColorDark
     border-r border-bgColorLight w-[180px] animate-slideleft'>
        <Link to="/">
          <img src={require('../assets/symbol.png')} alt="symbol" className='h-16 w-16 object-contain'/>
          <h1 className='font-bold text-2xl symbol'>Chillify</h1>
        </Link>
        <NavLinks setOpenMobile={setOpenMobile}/>
      </div> 
      {/* view/close button and symbol*/}
      <div className='md:hidden fixed z-[2] w-full p-4 flex justify-between bg-bgColorDark '>
          <Link to="/" className='flex gap-2 items-center'>
            <img src={require('../assets/symbol.png')} alt="symbol" 
            className='md:hidden h-8 w-8 first-line:object-contain cursor-pointer'/>
            <h1 className='font-bold text-base symbol'>Chillify</h1>
          </Link>
          <div className='md:hidden'>
            {openMobile ? <CloseIcon className="w-6 h-6 cursor-pointer" onClick={() => setOpenMobile(false)}/> : 
            <ViewHeadlineIcon className="w-6 h-6 cursor-pointer"
            onClick={() => setOpenMobile(true)}
            />}
          </div>
        </div>
      {/* mobile */}
      <div className={`md:hidden w-2/4 px-5 py-5 fixed flex z-[9999] hide-scrollbar h-screen overflow-y-scroll
        bg-gradient-to-r from-bgColorDarker to-bgColorDark duration-300 ease-linear 
        ${openMobile ? "flex" : "hidden"}`}
        >
          <NavLinks setOpenMobile={setOpenMobile}/>
        </div>
        <div 
        className={`${openMobile ? "flex" : "hidden"} sidebar fixed right-0 w-2/4 h-full bg-black z-[9999] bg-opacity-0`}
        onClick={() => setOpenMobile(false)}
        />
    </div>
  )
}

export default React.memo(Sidebar)