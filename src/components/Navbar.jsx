import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()
  
  const handleSignOut = async () => {
    try{
      await logOut()
    }catch(e){
      console.log(e)
    }
  }
  const handleAccount = () => {
    let path = '/account'
    navigate(path)
  }
  const handleHome = () => {
      let path = '/home'
      navigate(path)
  }
  const handleCalendar = () => {
      let path = '/calendar'
      navigate(path)
  }
  const handleTodo = () => {
      let path = '/todo'
      navigate(path)
  }
  return(
    <div>
      <div>
        <h1>Firebase Google Auth & Context</h1>
        <button onClick={handleAccount}>Account</button>
        {user?.displayName ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : ( 
          <Link to='/signin'>Sign in</Link>
        )}
      </div>
      <div>
        <button onClick={handleHome}>Home</button>
        <button onClick={handleCalendar}>Calendar</button>
        <button onClick={handleTodo}>Todo</button>
      </div>
    </div>
  )
}
export default Navbar