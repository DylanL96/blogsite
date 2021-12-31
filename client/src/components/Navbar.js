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
  };

  const handleHome = event => {
    navigate('/')
  }
  return(
    <div>
      {!isAuthenticated() && <React.Fragment>
        <Link to="/signup">Sign-Up</Link>
        <Link to="/signin">Sign-In</Link>
        <Link to="/">Home</Link>
        </React.Fragment>}
        {isAuthenticated() && 
        (<React.Fragment>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleHome}>Home</button>
          {/* <Link to="/">Home</Link> */}
        </React.Fragment>
        
      )}
      {isAuthenticated() && isAuthenticated().role === 1 && 
      <p>Welcome {username.username} 
      <Link to="/admin">Admin Page</Link> 
      <Link to="/admin/create">Create A Post</Link></p>}
      {isAuthenticated() && isAuthenticated().role === 0 && <p>Welcome {username.username} <Link to="/user">User Page</Link></p>}
    </div>
  )
};

export default Navbar;