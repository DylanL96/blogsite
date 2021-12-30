import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import User from './components/User';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
        <Route exact path ='/signup' element={<Signup/>}/>
        <Route exact path ='/signin' element={<Signin/>}/>
        <Route exact path = '/user' element={<User/>}/>
      </Routes>
    </div>
  )
}

export default App;
