import React from 'react'

function SeekBar({ value, min, max, onChange }) {
  const getTime = (time) => {
    return `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`
  }

  return (
    <div className='flex flex-row justify-between items-center gap-1 text-center'>
      <p className='w-8 font-medium text-xs'>{getTime(value)}</p>
      <input
        type="range"
        step="any"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className='h-1 text-[#e8e7e7] accent-bgColorLighter w-[80px] sm:w-[140px] lg:w-[320px] md:w-[180px]'
      />
      <p className='w-8 font-medium text-xs'>{getTime(max)}</p>
    </div>
  )
}

export default SeekBar
