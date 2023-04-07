/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreated, setIsAdded, setIsRemoved} from '../redux/features/playerSlice';
import {setLogin} from '../redux/features/auth'

function Notification({message}) {
    const {isCreated, isAdded, isRemoved} = useSelector(state => state.player)
    const {isLogged} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            if(isCreated){
                dispatch(setIsCreated(false))
            }
            else if(isAdded){
                dispatch(setIsAdded(false))
            }
            else if(isRemoved){
                dispatch(setIsRemoved(false))
            }
            else if(isLogged){
                dispatch(setLogin(false))
            }
        }, 3000)
    }, [isCreated, isAdded, isRemoved])

  return (
    <div>
       <div className={`text-xs sm:text-base font-bold py-4 px-8 rounded-xl bg-bgPlayerColorDark`}>
        <span 
        className='cursor-pointer'
        onClick={() => {
       

        }}
        >
            {message}
        </span>
        </div>
    </div>
  )
}

export default Notification
