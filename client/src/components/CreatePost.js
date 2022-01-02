import React, {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import {useNavigate} from 'react-router-dom';
import {showErrorMessage, showSuccessMessage} from '../helpers/messages';
import axios from 'axios';

const CreatePost = () => {
  let navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    description: '',
    successMessage: false,
    errorMessage: false,
    loading: false
  });

  const {title, body, description, successMessage, errorMessage} = postData;

  const handleChange = event => {
    setPostData({
      ...postData,
      [event.target.name] : event.target.value,
      successMessage: '',
      errorMessage: ''
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted post!');
    if(isEmpty(title) || isEmpty(body) || isEmpty(description)){
      setPostData({
        ...postData,
        errorMessage: 'All fields are required'
      })
    } else {
      // const {title, body, description} = postData;
      // const data = {title, body, description};
      setPostData({...postData, loading: true});
      console.log(`Submitted post data: `, postData)

      // submit the data to the server
      axios.post('http://localhost:3001/blog/create', postData)
        .then(response => {
          navigate('/')
          // console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const createPostForm = () => (
    <div className="signup-form">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Enter Title</label>
        <input name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputDescription">Enter Description</label>
        <input name="description" className="form-control" id="exampleInputDescription" aria-describedby="descriptionHelp" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Enter text body</label>
        <textarea name="body" type="body" className="form-control" id="text-area"onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
  return(
    <div>
      <div>{successMessage && showSuccessMessage(successMessage)}</div>
      <div>{errorMessage && showErrorMessage(errorMessage)}</div>
      <div>{createPostForm()}</div>
    </div>
  )
};

export default CreatePost;

