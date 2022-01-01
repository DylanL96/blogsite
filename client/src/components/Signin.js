import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {showErrorMessage} from '../helpers/messages';
import { showLoading } from '../helpers/loading';
import {setAuthentication, isAuthenticated} from '../helpers/auth';
import { signin } from '../api/auth';

const Signin = () => {
  let navigate = useNavigate();

  // will not let the user go to the signin or signup page when they are logged in
  useEffect(() => {
    if(isAuthenticated() && isAuthenticated().role === 1){
      navigate('/admin')
    } else if (isAuthenticated() && isAuthenticated().role === 0){
      navigate('/user')
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMessage: false,
    loading: false
  });

  const {email, password, errorMessage, loading} = formData;

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      errorMessage: ''
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Sign in form submitted');
    
    if(isEmpty(email) || isEmpty(password)){
      setFormData({
        ...formData,
        errorMessage: 'All fields are required'
      })
    } else if (!isEmail(email)){
      setFormData({
        ...formData,
        errorMessage: 'Invalid email'
      })
    } else {
      // pass client side validation, destruture the data from the formData state
      const {email, password} = formData;
      const data = {email, password};

      // setting the form data and creating a new iterable copy of the array using spread operator.
      setFormData({...formData, loading: true})
      console.log(`the sign in form data:`, data);

      // sending the destructured data object to the signin axios POST request
      signin(data)
        .then(response => {
          setAuthentication(response.data.token, response.data.user)
          // console.log(response.data)
          if(isAuthenticated() && isAuthenticated().role === 1){
            navigate('/admin')
          } else {
            console.log('Redirect to user dashboard')
            navigate('/user')
          }
        })
        .catch(error => {
          console.log('error logging in')
          setFormData({
            ...formData,
            errorMessage: 'Invalid email or password. Try again.'
          })
        })
    }
    
  }

  const showSigninForm = () => (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <h2>Log in</h2>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input name="email"  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
  return (
    <div>
      {loading && showLoading()}
      {errorMessage && showErrorMessage(errorMessage)}
      {showSigninForm()}
    </div>
  )
};

export default Signin;

