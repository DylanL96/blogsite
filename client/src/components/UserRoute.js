import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {isAuthenticated} from '../helpers/auth';

const UserRoute = () => {
  // console.log(isAuthenticated().role)

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to signin page
  return isAuthenticated().role===0  ? <Outlet /> : <Navigate to="/signin" />;
};


export default UserRoute;