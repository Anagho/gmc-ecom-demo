import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  return (
    <div className='container py-24 mx-auto'>
        <h1 className='text-3xl text-blue-800'>Welcome back {user.name}</h1>
        <p className='text-gray-500'>Enjoying your shopping</p>
    </div>
  )
}

export default UserProfile