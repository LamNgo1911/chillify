import React, { useEffect } from 'react'
import SongCard from '../components/SongCard';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from '../api/axios';


const Genre = ({auth}) => {
    let {genre} = useParams()
    const navigate = useNavigate()
    const {activeSong, isPlaying} = useSelector(state => state.player)
    genre = genre.charAt(0).toUpperCase() + genre.slice(1)
   
    const [songsData, setSongsData] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(false)

    !auth && navigate(`/genre/${genre}`)
    useEffect(() => {
        const getGenreSongs = async () => {
            try {
                setIsFetching(true)
                const {data} = await axios.get(`chart/songs?genre=${genre}`)
                setIsFetching(false)
                setSongsData(data?.data)
                console.log(data?.data)
            } catch (error) {
                setIsFetching(false)
                console.log(error)
            }

        }
        getGenreSongs()
    }, [genre])

    if(isFetching) return <Loading />
    if(songsData.length === 0) return <h1 className='text-2xl flex justify-center h-[80vh] items-center'>No songs found</h1>
    return (
        <div className='flex flex-col pb-8 w-full ease-in duration-300 '>
            <div className='relative flex items-center h-[40vh] bg-gradient-to-b via-bgPlayerColorDark from-bgColor to-bgColor'>
                <h2 className='font-bold text-[72px] md:text-[80px] px-8'>{genre.toUpperCase()}</h2>
            </div>
            {/* songs*/}
            <div className='flex flex-wrap justify-center md:justify-start gap-4 px-8'>
                {songsData?.map((song,i)=>
                <SongCard
                key={song?._id}
                songId={song?._id}
                artistId={song?.artist?.artistId}
                song={song} 
                i={i}
                data={songsData}
                activeSong={activeSong}
                isPlaying={isPlaying}
                />)}
            </div>  
        </div>
    )
}

export default React.memo(Genre)