import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import './design.css'

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
    <div className='nav'>
      <div>
        <h1 className='navTopic'>
          E-Learning Portal by ISNE
        </h1>
      <button className='button' style={{ left: '32%' }} onClick={handleHome}>Dashboard</button>
        <button className='button' style={{ left: '32%' }} onClick={handleCalendar}>Calendar</button>
        <button className='button' style={{ left: '32%' }} onClick={handleTodo}>Todo</button>
        {user?.displayName ?(
          <button className='button' style={{ left: '44.5%' }}
          onClick={handleAccount}>Account</button>
        ) :(<Link></Link>)}
        {user?.displayName ? (
          <button className='button' style={{ left: '44.5%' }}
          onClick={handleSignOut}>Logout</button>
        ) : ( 
          <Link to='/signin' className='button' state={{ left: '44.5%' }}>Sign in</Link>
          )}
      </div>
    </div>
  )
}
export default Navbar