import React from 'react'
import { useDispatch } from 'react-redux'
import { setPlaylists } from '../redux/features/playerSlice'

function Message({points, playlist, playlists, clicked}) {

  const dispatch = useDispatch()
 
  return (
    <div className={`message absolute z-[9999] mx-auto w-[120px] h-[100px] text-sm py-4 px-8 rounded-xl ${clicked ? 'block' : 'hidden'}
    bg-bgPlayerColorDark font-bold top-[${points.y}px] left-[${points.x}px]`}>
      <h2 
      className='cursor-pointer'
      onClick={() => {
        dispatch(setPlaylists(playlists.filter((item) => item?.id !== playlist?.id)))

      }}
      >
        {playlist?.name && 'Remove from playlist'}
       </h2>
    </div>
  )
}

export default Message
