import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import UserData from '../Pages/UserData'
import PrivateRoute from '../Components/PrivateRoute'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/user' element={
          <PrivateRoute>
        <UserData/>
        </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default AllRoutes
