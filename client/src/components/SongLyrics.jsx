import React from 'react'

function SongLyrics({lyrics}) {
    return (
        <>
            <h1 className='text-lg sm:text-2xl font-bold px-8'>Lyrics</h1>
            <div dangerouslySetInnerHTML={{__html: lyrics}} className='flex flex-col animate-slideup duration-300 px-8'/>
        </>
    )
}

export default SongLyrics

