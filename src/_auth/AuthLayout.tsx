import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false; 
  return (
    <>
    {isAuthenticated ? (
      <Navigate to="/" />
    ):
    (
      <>
        <section className='flex flex-1 justify-center items-center flex-col'>
          <Outlet />
        </section>

        <iframe
        src="https://lottie.host/embed/f1bd2f53-840f-4f20-a00b-2e1339df3593/LscoOIXSV9.lottie"

        className='hidden xl:block h-screen w-1/2'
        style={{ border: 'none' }}
        />
      </>
    )}
    </>
  )
}

export default AuthLayout