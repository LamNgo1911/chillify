import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);


const ArtistCard = ({artist,i,artistId}) =>{
  const navigate = useNavigate();
  return (
       <div key={i}
        className='flex lg:w-full h-full object-contain flex-col
        rounded-lg justify-base mx-auto items-center gap-2 hover:scale-105
        cursor-pointer ease-in-out duration-300 px-2'
        onClick={() => navigate(`/artists/${artistId}`)}>
          <img src={artist?.artistImage} alt="Artist" 
          className='w-full rounded-full object-fit' />
          <p className='text-center text-xs md:text-sm font-semibold'>{artist?.artistName}</p>
        </div>
  )
}

function TopArtists({data}) {
 
  return (
    <div className='px-8 w-full'>
        <div className='flex flex-row justify-between'>
            <h2 className='text-base md:text-lg font-bold'>Top Artitsts</h2>
        </div>
        {/* top Artists */}
        <Swiper 
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          effect={'coverflow'}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={
            {clickable: true}
          }
          style={{
          '--swiper-pagination-color': '#ad38ad', 
          '--swiper-pagination-bullet-active': '#ad38ad'}}
          className='mt-8'
        >
          {data?.map((artist,i) =>{
            return (
              <SwiperSlide
              style={{width: '25%', padding: '30px 0'}}
              key={i}
              >
                <ArtistCard
                  key={artist?._id}
                  artist={artist}
                  i={i}
                  artistId={artist?._id}
                />
            </SwiperSlide>)
          })}
        </Swiper>
    </div>
  )
}

export default TopArtists