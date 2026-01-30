import React, { useState } from 'react'
import Login from '../components/logIn'
import Register from '../components/Register'

const AuthLayout = () => {

    const [toggle,setToggle]=useState(false)
  return (
    <div>
      {
        toggle?<Login setToggle={setToggle} /> :<Register setToggle={setToggle} />
      }
    </div>
  )
}

export default AuthLayout
