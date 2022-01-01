import React from 'react';
import {useNavigate} from 'react-router-dom';
import {isAuthenticated, logout} from '../helpers/auth';
import '../App.css'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = event => {
    logout(() =>{
      navigate('/signin')
    })
  };

  return(
    <div className="topnav">
    <a className="active" href="/">Home</a>
    {isAuthenticated() && isAuthenticated().role === 0 && <a className="nav-link" href="/user">User's Page</a>}
    {isAuthenticated() && isAuthenticated().role === 1 && <a className="nav-link" href="/admin">Admin's Page</a>}
    {isAuthenticated() && isAuthenticated().role === 1 && <a className="nav-link" href="/admin/create">Create a Post</a>}
    {!isAuthenticated() && <a className="nav-link" href="/signin">Sign-in</a>}
    {!isAuthenticated() && <a className="nav-link" href="/signup">Sign-up</a>}
    <div className="topnav-right">
    {isAuthenticated() && (<button className="nav-link" onClick={handleLogout}>Logout </button>)}
    </div>
  </div>
  )
};

export default Navbar;