import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNav from '../components/AuthNav'

const AuthLayout = () => {
  return (
    <>
    <AuthNav/>
    <Outlet/>
    </>
  )
}

export default AuthLayout