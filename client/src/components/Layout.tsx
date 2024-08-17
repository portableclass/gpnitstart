import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Sidebar from './Sidebar/Sidebar'
import TopNav from './TopNav'
import '../assets/styles/scss/mainPage.scss'
import 'react-toastify/dist/ReactToastify.css'

const Layout: FC = () => {
    return (
        <>
            <TopNav />
            <main className='main-wrapper d-flex'>
                <Sidebar />
                <div className='temp-content d-flex flex-column w-100 min-vh-100'>
                    {/* <Spinner /> */}
                    <Outlet />
                    <ToastContainer />
                </div>
            </main>
        </>
    )
}

export default Layout
