
import Home from "./pages/Home"
import {Routes, Route } from "react-router-dom";
import Search from "./pages/Search"
import Discover from "./pages/Discover"
import Albums from "./pages/Albums"
import Artists from "./pages/Artists"
import Songbar from './components/Songbar/index';
import ArtistDetails from './pages/ArtistDetails';
import Sidebar from "./components/Sidebar";
import Recent from "./pages/Recent";
import { useSelector } from 'react-redux';
import AlbumDetails from "./pages/AlbumDetails";
import SongDetails from "./pages/SongDetails";
import Genre from "./pages/Genre";
import Favorites from "./pages/Favorites";
import Playlist from "./pages/Playlist";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  const {activeSong, isPlaying, isAdded, isRemoved, isCreated} = useSelector(state => state.player)
  const {auth, user, isLogged} = useSelector(state => state.auth)
  
  return (
    <div className="relative h-full flex flex-col md:flex-row bg-gradient-to-br via-bgPlayerColorDarker from-bgColor to-bgColor text-textColor">
      {auth && <Sidebar />}
      <div className='flex-1 flex flex-col lg:flex-row w-[full]'>
        <div className='w-full hide-scrollbar h-[100vh] overflow-y-scroll'>
            <Routes>
              {/* menu */}
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/' element={<Home activeSong={activeSong}  isPlaying={isPlaying } auth={auth}/>} />
              <Route path='songs/:songId' element={<SongDetails auth={auth}/>}/>
              <Route path='/search' element={<Search auth={auth}/>}/>
              <Route path='/:genre' element={<Genre auth={auth}/>}/>
              <Route path='/discover' element={<Discover auth={auth}/>}/>
              <Route path='/albums' element={<Albums auth={auth}/>}/>
              <Route path='/albums/:albumId' element={<AlbumDetails auth={auth}/>}/>
              <Route path='/albums/:id/songs/:songId' element={<SongDetails auth={auth}/>}/>
              <Route path='/albums/:albumId/artists/:artistId' element={<ArtistDetails auth={auth}/>}/>
              <Route path='/artists' element={<Artists auth={auth}/>}/>
              <Route path='/artists/:artistId' element={<ArtistDetails auth={auth}/>} />
              
              {/* library */}
              <Route path='/recent' element={<Recent auth={auth}/>} />
              <Route path='/favorites' element={<Favorites auth={auth}/>} />
              <Route path='/playlist/:id' element={<Playlist auth={auth}/>} />
            </Routes>
            
            {auth && <Footer />}
        </div>
        {auth && 
        <div className='fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center w-full text-sm text-textColorLight md:text-base'>
            {isAdded && <Notification message='Added to your favorite songs' />}
            {isRemoved && <Notification message='Removed from your favorite songs' />}
            {isCreated && <Notification message='Playlist created' />}
            {isLogged && <Notification message={`Welcome ${user?.name}`} />}
            <Songbar />
        </div> 
        }
      </div>
    </div>
  );
}

export default App;
