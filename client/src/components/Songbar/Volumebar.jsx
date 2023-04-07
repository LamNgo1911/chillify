import React from 'react'
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

function Volumebar({value,min,max,onChange,setVolume}) {
  // console.log(value)
  return (
    <div className='sm:flex justify-self-end hidden flex-row justify-between items-center gap-4 text-center '>
        {value <= 1 && value > 0.5 && <BsFillVolumeUpFill size={25} color="#FFF"  onClick={() => setVolume(0)} />}
        {value <= 0.5 && value > 0 && <BsVolumeDownFill size={25} color="#FFF"  onClick={() => setVolume(0)} />}
        {value <= 0 && <BsFillVolumeMuteFill size={25} color="#FFF"  onClick={() => setVolume(1)} />}
        <input 
        type="range" 
        step="any"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className='h-1 accent-bgColorLighter lg:w-[180px]' 
        />    
  </div>
  )
}

export default Volumebar