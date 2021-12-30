import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {isAuthenticated, logout} from '../helpers/auth';

const Navbar = () => {
  const username = isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = event => {
    logout(() =>{
      navigate('/signin')
    })
  }
  return(
    <div>
      {!isAuthenticated() && <React.Fragment>
        <Link to="/signup">Sign-Up</Link>
        <Link to="/signin">Sign-In</Link>
        <Link to="/">Home</Link>
        </React.Fragment>}
      {isAuthenticated() && isAuthenticated().role === 1 && <p>Welcome {username.username}</p>}
      {isAuthenticated() && isAuthenticated().role === 0 && <p>Welcome {username.username}</p>}
      {isAuthenticated() && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  )
};

export default Navbar;