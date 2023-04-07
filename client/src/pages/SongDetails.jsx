/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsHeader from '../components/DetailsHeader'
import Loading from '../components/Loading'
import SongLyrics from '../components/SongLyrics'
import axios from '../api/axios'

function SongDetails({auth}) {
  const {songId} = useParams()
  const navigate = useNavigate()
  const {activeSong, isPlaying, currentIndex} = useSelector(state => state.player)
  const [songDetails, setSongDetails] = React.useState(null)
  const [isFetching, setIsFetching] = React.useState(false)

  !auth && navigate(`/songs/${songId}`)
  useEffect(() => {
    const getSongDetails = async () => {
     try {
      setIsFetching(true)
      const {data} = await axios.get(`/chart/songs/${songId}`,
         {
        headers: {
            'Content-Type': 'application/json',
            },
          }
      )
      setIsFetching(false)
      // console.log(data?.data)
      setSongDetails(data?.data)
     } catch (error) {
      setIsFetching(false)
      console.log(error)
     }
    }
    getSongDetails()
  }, [])

  
  return (
      isFetching ? <Loading /> : (
        <div className='flex flex-col gap-8 pb-8'>
          <DetailsHeader
              songDetails={songDetails}
              song={songDetails}
              data={[songDetails]}
              songId={songDetails?._id}
              i={currentIndex}
              activeSong={activeSong}
              isPlaying={isPlaying}
              likedButton='likedButton'
          />
          <SongLyrics 
              lyrics={songDetails?.lyrics}
          /> 
      </div>
    )
  )
}
export default React.memo(SongDetails)