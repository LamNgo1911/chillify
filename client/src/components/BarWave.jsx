import React from 'react'

function BarWave() {
  return (
    <div className='flex flex-row items-end w-5 h-5'>
      <div className='w-1 h-4 border bg-bgColorLighter animate-move1'></div>
      <div className='w-1 h-3 border bg-bgColorLighter animate-move2'></div>
      <div className='w-1 h-3.5 border bg-bgColorLighter animate-move3'></div>
      <div className='w-1 h-2 border bg-bgColorLighter animate-move4'></div>
      <div className='w-1 h-4 border bg-bgColorLighter animate-move5'></div>
    </div>
  )
}

export default BarWave
