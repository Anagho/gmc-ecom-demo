import React from 'react'
import UserSidebar from '../components/userDashboard/UserSidebar'
import { Outlet } from "react-router";

const UserDashboardLayout = () => {
  return (
    <main className='container mx-auto flex gap-10'>
        <UserSidebar />
        <section className='flex-1'>
            <Outlet />
        </section>
    </main>
  )
}

export default UserDashboardLayout