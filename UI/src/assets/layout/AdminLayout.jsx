import React from 'react'
// import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
// import AdminNav from '../components/AdminNav'

const AdminLayout = () => {
  return (
    <>
    {/* <AdminNav/> */}
    <Outlet/>
    
    {/* <ToastContainer/> */}
    </>
  )
}

export default AdminLayout