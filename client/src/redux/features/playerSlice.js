import {createSlice } from "@reduxjs/toolkit"

const RecentSongs = JSON.parse(sessionStorage.getItem("RecentSongs")) || []
const FavoriteSongs = JSON.parse(sessionStorage.getItem("FavoriteSongs")) || []
const Playlists = JSON.parse(sessionStorage.getItem("Playlists")) || []

// sessionStorage.removeItem("RecentSongs")
// sessionStorage.removeItem("FavoriteSongs")
// sessionStorage.removeItem("Playlists")

const initialState = {
    currentSongs:[],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    isAdded: false,
    isRemoved: false,
    isCreated: false,
    activeSong: {},
    favoriteSongs: FavoriteSongs,
    playlists: Playlists,
    recentSongs: RecentSongs,
}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers:{
        setActiveSong: (state, action) =>{
            state.activeSong = action.payload?.song

            state.currentSongs = action.payload?.data

            state.currentIndex = action.payload?.i

            state.isActive = true
        },
        setIsPlaying: (state, action) =>{
            state.isPlaying = action.payload
        },
        nextSong: (state) =>{
            if(state.currentIndex === state.currentSongs.length - 1){
                state.activeSong =(state.currentSongs[0]?.song || state.currentSongs[0])
                state.currentIndex = 0
            }
            else{
                state.activeSong = ((state.currentSongs[state.currentIndex + 1]?.song) || state.currentSongs[state.currentIndex + 1])
                state.currentIndex += 1
            }
            state.isActive = true
        },
        previousSong: (state) =>{
            if(state.currentIndex === 0){
                state.activeSong = state.currentSongs[state.currentSongs.length - 1]
                state.currentIndex = state.currentSongs.length - 1
            }
            else{
                state.activeSong = state.currentSongs[state.currentIndex - 1]
                state.currentIndex -= 1
            }
            state.isActive = true
        },
        shuffleSong: (state) =>{
            const randomNumber = Math.floor(Math.random() * state.currentSongs.length)

            state.activeSong = state.currentSongs[randomNumber]
            state.currentIndex = randomNumber
            state.isActive = true
        },
        // favorite
        setFavoriteSongs: (state, action) =>{
            if(!state.favoriteSongs?.find(({song, dateTime}) => song?._id === action.payload?._id )){
                state.favoriteSongs = [...state.favoriteSongs, {song: action.payload, dateTime: new Date().getTime(), isFavorite: true}]
                sessionStorage.setItem("FavoriteSongs", JSON.stringify(state.favoriteSongs))
            }
        },
        removeFavoriteSongs: (state, action) =>{
            state.favoriteSongs = state.favoriteSongs?.filter(({song, dateTime}) => (song?._id  !== action.payload?._id ))

            sessionStorage.setItem("FavoriteSongs", JSON.stringify(state.favoriteSongs))
        },
        // playlist
        setPlaylists: (state, action) =>{
            state.playlists = action.payload
            sessionStorage.setItem("Playlists", JSON.stringify(state?.playlists))
        },
        // recent
        setRecentSongs: (state, action) =>{
            if(!(state.recentSongs?.find(({song}) =>
                (song?._id) === (action.payload?._id)))
            ){
                state.recentSongs = [...state.recentSongs, {song: action.payload, dateTime: new Date().getTime()}]
                sessionStorage.setItem("RecentSongs", JSON.stringify(state.recentSongs))
            }
        },
        removeRecentSongs: (state) =>{
            if(state.recentSongs?.length > 5){
                state.recentSongs = state.recentSongs.slice(1, 6)
            }
            sessionStorage.setItem("RecentSongs", JSON.stringify(state?.recentSongs))
        },
        // notification
        setIsAdded: (state, action) =>{
            state.isAdded = action.payload
        },
        setIsRemoved: (state, action) =>{
            state.isRemoved = action.payload
        },
        setIsCreated: (state, action) =>{
            state.isCreated = action.payload
        },
    }
})

export const {
    // Player
    setActiveSong,
    setIsPlaying, 
    nextSong, 
    previousSong, 
    shuffleSong, 
    // Favorite
    setFavoriteSongs, 
    removeFavoriteSongs,
    // Recent
    setRecentSongs,
    removeRecentSongs,
    // Playlist
    setPlaylists,
    // Notification
    setIsAdded,
    setIsRemoved,
    setIsCreated

} = playerSlice.actions

export default playerSlice.reducer