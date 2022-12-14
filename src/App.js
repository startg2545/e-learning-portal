import './App.css';
import Navbar from './components/Navbar'
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import Account from './pages/Account'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Protected from './components/Protected'
import HomeMenu from './pages/HomeMenu'
import TodoMenu from './pages/TodoMenu'
import CalendarMenu from './pages/CalendarMenu';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route 
            path='/account'
            element={
            <Protected>
              <Account />
            </Protected>
            } 
          />
          <Route path='/home' element={
            <Protected>
              <HomeMenu/>
            </Protected>
          }/>
          <Route path='/calendar' element={
            <Protected>
              <CalendarMenu/>
            </Protected>
          }/>
          <Route path='/todo' element={
            <Protected>
              <TodoMenu/>
            </Protected>
          }/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
