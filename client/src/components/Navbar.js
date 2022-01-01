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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
            {!isAuthenticated() && 
            <a className="nav-link" href="/signin">Sign-in</a>}
            </li>
            <li className="nav-item">
            {!isAuthenticated() && 
            <a className="nav-link" href="/signup">Sign-up</a>}
            </li>
            <li className="nav-item">
            {isAuthenticated() && isAuthenticated().role === 1 && 
            <a className="nav-link" href="/admin">Admin's Page</a>}
            </li>
            <li className="nav-item">
            {isAuthenticated() && isAuthenticated().role === 1 && 
            <a className="nav-link" href="/admin/create">Create a Post</a>}
            </li>
            <li className="nav-item">
            {isAuthenticated() && isAuthenticated().role === 0 && 
            <a className="nav-link" href="/user">User's Page</a>}
            </li>
            <li className="nav-item">
            {isAuthenticated() && (<button className="nav-link" onClick={handleLogout}>Logout </button>)}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
};

export default Navbar;