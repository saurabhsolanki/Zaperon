import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Redux/auth/action';

const UserData = () => {
  const {token,username,error,loading,userInfo} = useSelector((store) => store.auth);
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getUser(token))
  },[token])
  return (
    <div>
      <Header />
    </div>
  )
}

export default UserData
