"use client"
import { logout, useLogoutMutation } from '@/redux/features/Auth/authSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const LogoutButton = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [logout, { isSuccess, isLoading, isError }] =
  useLogoutMutation();

  useEffect(()=>{
if(isSuccess){
  router.refresh()
}
  },[isSuccess])
  return (
    <button
              onClick={() => {
                logout()
               
              }}
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
            >
              Logout
            </button>
  )
}

export default LogoutButton