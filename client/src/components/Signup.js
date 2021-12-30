import React, {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import {showErrorMessage, showSuccessMessage} from '../helpers/messages';
import {showLoading} from '../helpers/loading';
import {signup} from '../api/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: 'johndoe',
    email: 'johndoe@hotmail.com',
    password: 'Doors343727',
    password2: 'Doors343727',
    successMsg: false,
    errorMsg: false,
    loading: false
  })
  // destructure the form data
  const {username, email, password, password2, successMsg, errorMsg, loading} = formData;

  // used to set the data for the data the users input
  const handleChange = event => {
    setFormData({
      ...formData,[event.target.name]: event.target.value,
      successMsg: '',
      errorMsg: ''
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('sign up form submitted')
    // provide client side validation
    if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
      setFormData({...formData, errorMsg:'All fields are required to be completed'})
    } else if (!isEmail(email)){
      setFormData({
        ...formData, errorMsg: 'invalid email'
      })
    } else if (!equals(password, password2)){
      setFormData({
        ...formData, errorMsg: 'Passwords do not match'
      })
    } else {
      // success
      const {username, email, password} = formData;
      const data = {username, email, password};

      // take whatever data we have already, but only changing the loading state from false to true
      setFormData({...formData, loading:true});
      //passing our data field as an argument to the signup
      signup(data)
        .then((response => {
          console.log(response)
          setFormData({
            username: '',
            email: '',
            password: '',
            password2: '',
            loading: false,
            successMsg: response.data.successMessage
          })
        }))
        .catch(error => {
          console.log(error)
          setFormData({...formData, loading: false})
        })
    }
  };


  const showSignupForm = () => (
    <form className='signup-form' onSubmit={handleSubmit}>
        {/* username */}
        <div className='form-group input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    <i className='fa fa-user'></i>
                </span>
            </div>
            <input 
                name='username'
                value={username}
                className='form-control'
                placeholder='Username'
                type='text'
                onChange={handleChange}
            />
        </div>
        {/* email */}
        <div className='form-group input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    <i className='fa fa-envelope'></i>
                </span>
            </div>
            <input
                name='email'
                value={email}
                className='form-control'
                placeholder='Email address'
                type='email'
                onChange={handleChange}
            />
        </div>
        {/* password */}
        <div className='form-group input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    <i className='fa fa-lock'></i>
                </span>
            </div>
            <input 
                name='password'
                value={password}
                className='form-control'
                placeholder='Create password'
                type='password'
                onChange={handleChange}
            />
        </div>
        {/* password2 */}
        <div className='form-group input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    <i className='fa fa-lock'></i>
                </span>
            </div>
            <input 
                name='password2'
                value={password2}
                className='form-control'
                placeholder='Confirm password'
                type='password'
                onChange={handleChange}
            />
        </div>
        {/* signup button */}
        <div className='form-group'>
            <button type='submit' className='btn btn-primary btn-block'>
                Signup
            </button>
        </div>
        {/* already have account */}
    </form>
);

  return(
    <div>Welcome to Signup Page
      {/* if errorMsg is true, then execute showErrorMessage */}
      {errorMsg && showErrorMessage(errorMsg)}
      {successMsg && showSuccessMessage(successMsg)}
      {loading && showLoading()}
      {showSignupForm()}
      {/* {JSON.stringify(formData)} */}
    </div>
  )
};

export default Signup;