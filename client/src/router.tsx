import React from 'react'
import {
    createBrowserRouter,
    createHashRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Table from './components/Table/Table'
import createLoader from './helpers/loaders/createLoader'
import editLoader from './helpers/loaders/editLoader'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import Product from './components/Product'
import UserPage from './pages/UserPage'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path='/'
                element={<Layout />}
                errorElement={<ErrorBoundary />}
            >
                <Route
                    index
                    element={<MainPage />}
                    errorElement={<ErrorBoundary />}
                />
                <Route path='product'>
                    <Route
                        index
                        element={<Table />}
                        errorElement={<ErrorBoundary />}
                    />

                    <Route
                        path=':id/edit'
                        element={<Product />}
                        loader={editLoader}
                        errorElement={<ErrorBoundary />}
                    />
                    <Route
                        path='create'
                        element={<Product />}
                        loader={createLoader}
                        errorElement={<ErrorBoundary />}
                    />
                </Route>
                <Route path='user'>
                    <Route
                        index
                        element={<UserPage />}
                        errorElement={<ErrorBoundary />}
                    />
                </Route>
            </Route>
            <Route path='/404' element={<NotFoundPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>,
    ),
)

export default router
