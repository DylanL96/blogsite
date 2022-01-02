import React, {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import {useNavigate} from 'react-router-dom';
import {showErrorMessage, showSuccessMessage} from '../helpers/messages';
import {showLoading} from '../helpers/loading';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

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
      // take whatever data we have already, but only changing the loading state from false to true
      setFormData({...formData, loading:true});
      //passing our data field as an argument to the signup
      axios.post('http://localhost:3001/signup', formData)
        .then(response => {
          // console.log(response)
          navigate('/')
            setFormData({
            username: '',
            email: '',
            password: '',
            password2: '',
            loading: false,
            successMsg: response.data.successMessage,
          })
        })
        .catch(error => {
          console.log(error)
          setFormData({...formData, errorMsg: error.data.errorMsg})
        })
    }
  };


  const showSignupForm = () => (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div>
        <h2>Register</h2>
          <p className="hint-text">Create your account. It's free and only takes a minute.</p>
          <label htmlFor="exampleInputUsername">Username</label>
          <input name="username" value={username} type="username" className="form-control" aria-describedby="emailHelp" placeholder="Enter Username" onChange={handleChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail">Email</label>
          <input name="email" value={email} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter Username" onChange={handleChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Password2</label>
          <input name="password2" type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
);

  return(
    <div>
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
