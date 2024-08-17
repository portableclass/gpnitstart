import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/useReduxHooks'

const PrivateRoute = () => {
    const location = useLocation()
    // const { isAuth, user } = useAppSelector(state => state.account)

    // eslint-disable-next-line no-nested-ternary
    return true ? (
        true ? (
            <Outlet />
        ) : (
            <Navigate to='/404' state={{ from: location }} />
        )
    ) : (
        <Navigate to='/login' state={{ from: location }} />
    )
}

export default PrivateRoute
