/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsHeader from '../components/DetailsHeader'
import Loading from '../components/Loading'
import RelatedSongs from '../components/RelatedSongs'
import axios from '../api/axios'

function AlbumDetails({auth}) {
  const {albumId} = useParams()
  const navigate = useNavigate()
  const {activeSong, isPlaying, currentIndex} = useSelector(state => state.player)
  const [isFetching, setIsFetching] = React.useState(false)
  const [albumDetails, setAlbumDetails] = React.useState(null)
  const [songsData, setSongsData] = React.useState(null)
 
  useEffect(() => {
    const getAlbumDetails = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get(`/chart/albums/${albumId}`)
        setAlbumDetails(data?.data)
        setIsFetching(false)
        // console.log(data?.data)
      } catch (error) {
        setIsFetching(false)
        console.log(error)
      }
    }

    const getSongsbyAlbum = async () => {
      try {
        setIsFetching(true)
        const {data} = await axios.get(`/chart/albums/${albumId}/songs`)
        setSongsData(data?.data)
        setIsFetching(false)
        // console.log(data?.data)
      } catch (error) {
        setIsFetching(false)
        console.log(error)
      }
    }

    getSongsbyAlbum()
    getAlbumDetails()
  }, [])

  // console.log(albumDetails)
  !auth && navigate(`/albums/${albumId}`)
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-8 pb-8'>
          <DetailsHeader
            albumDetails={albumDetails}
            data={songsData}
            song={songsData?.[currentIndex]}
            songId={songsData?.[currentIndex]?._id}
            i={currentIndex}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
          <RelatedSongs 
            data={songsData}
            activeSong={activeSong}
            isPlaying={isPlaying}
            title='Songs Appearances:'
          />
       </div>
      )}
    </>
  )
}

export default React.memo(AlbumDetails)