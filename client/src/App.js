import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import User from './components/User';
import Admin from './components/Admin';
import UserRoute from './components/UserRoute';
import AdminRoute from './components/AdminRoute';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
        <Route exact path ='/signup' element={<Signup/>}/>
        <Route exact path ='/signin' element={<Signin/>}/>
        <Route element={<UserRoute/>}>
          <Route exact path='/user' element={<User/>}/>
        </Route>
        <Route element={<AdminRoute/>}>
          <Route exact path='/admin' element={<Admin/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
