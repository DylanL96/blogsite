import React, {useState} from 'react';
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty';
import {useParams, useNavigate} from 'react-router-dom';

const EditPost = () => {
  const params = useParams();
  let navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    body:'' 
  });

  const {title, body, description} = postData;

  const handleChange = event => {
    setPostData({
      ...postData,
      [event.target.name] : event.target.value
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted post!');
    if(isEmpty(title) || isEmpty(body) || isEmpty(description)){
      setPostData({
        ...postData, title:title, body:body, description: description
      })
    } else {

      // destructure data being submitted
      const {title, body, description} = postData;

      setPostData({...postData, title: title, body: body, description: description});
      const url = `http://localhost:3001/blog/posts/${params.id}`;
      const changedData = {...postData, title: title, body: body, description: description}
      console.log(changedData)

      // send data through PUT request
      axios.put(url, changedData)
        navigate('/')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const createPostForm = () => (
    <div className="signup-form">
    <form onSubmit={handleSubmit}>
      <div id="test" className="form-group">
      <h2>Edit Form</h2>
        <label htmlFor="exampleInputEmail1">Enter Title</label>
        <input name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputDescription">Enter description body</label>
        <input name="description" type="body" className="form-control" id="text-area"onChange={handleChange}/>
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
      <div>{createPostForm()}</div>
    </div>
  )
};
export default EditPost;
