import React from 'react'
import { Link } from 'react-router-dom'



const Category= ({type, color}) => {
    return(
        <div className={`w-[125px] h-[180px] lg:w-[180px] lg:h-[240px] 
        border border-bgColorLight rounded-xl ${color} object-fill cursor-pointer hover:scale-105`}>
            <h2 className='font-semibold p-4 text-gray-100'>{type}</h2>
        </div>
    )
}

function Categories({search}) {

  return (
    <div className={`flex-col gap-4 animate-slideup ease-in duration-300 ${search ? "hidden" : "flex"}`}>
      <h2 className='font-bold text-base md:text-lg'>Browse all</h2>
        
       <div className='flex flex-row gap-4 flex-wrap justify-center md:justify-start'>
        <Link to="/rap">
          <Category type="Rap" color={`bg-[#509bf5]`} />
        </Link>
        <Link to="/pop">
          <Category type="Pop" color={`bg-[#477d95]`}/>
        </Link >
        <Link to="/rb">
          <Category type="Rb" color={`bg-[#503750]`}/>
        </Link>
        <Link to="/rock">
          <Category type="Rock" color={`bg-[#af2896]`}/>
        </Link>
        <Link to="/country">
        <Category type="Country" color={`bg-[#777777]`}/>
        </Link>
       </div>
    </div>
  )
}

export default Categories