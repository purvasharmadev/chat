import React from 'react'
import { useDispatch } from 'react-redux'
import {  logout } from '../Auth/auth-slice';

export default function Home() {
  const dispatch = useDispatch()
  return (
    <div>Home
      <button onClick={()=>{
        dispatch(logout(false))
       }}>logout</button>
    </div>

  )
}
