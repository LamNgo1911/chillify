/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsHeader from '../components/DetailsHeader'
import Loading from '../components/Loading'
import RelatedSongs from '../components/RelatedSongs'
import axios from '../api/axios'


function ArtistDetails({auth}) {
  const {artistId} = useParams()
  const navigate = useNavigate()
  const {activeSong, isPlaying, currentIndex} = useSelector(state => state?.player)
  const [isFetching, setIsFetching] = useState(true)
  const [artistDetails, setArtistDetails] = useState(null)
  const [songsData, setSongsData] = useState(null)

    useEffect(() => {
      const fetchArtistDetails = async () => {
        try {
          setIsFetching(true)
          const {data} = await axios.get(`/chart/artists/${artistId}`)
          setArtistDetails(data?.data)
          setIsFetching(false)
          // console.log(data?.data)
        } catch (error) {
          setIsFetching(false)
          console.log(error)
        }
      }
  
      const getSongsbyArtist = async () => {
        try {
          setIsFetching(true)
          const {data} = await axios.get(`/chart/artists/${artistId}/songs`)
          setSongsData(data?.data)
          setIsFetching(false)
          // console.log(data?.data)
        } catch (error) {
          setIsFetching(false)
          console.log(error)
        }
      }
      getSongsbyArtist()
      fetchArtistDetails()
    }, [])

  // console.log(songsData?.[0])
  //  console.log(artistDetails)
  // console.log(currentIndex)

  !auth && navigate(`/artists/${artistId}`)
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-8 pb-8'>
          <DetailsHeader
            artistDetails={artistDetails}
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
            title='Related Songs:'
          />
        </div>
      )}
    </>
  )
}

export default React.memo(ArtistDetails)