import React, {useState} from 'react';
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty';
import {useParams} from 'react-router-dom';

const EditPost = () => {
  const params = useParams();

  const [postData, setPostData] = useState({
    title: 'Test title 1',
    body: 'Test Body 1',
  });

  const {title, body} = postData;

  const handleChange = event => {
    setPostData({
      ...postData,
      [event.target.name] : event.target.value
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted post!');
    if(isEmpty(title) || isEmpty(body)){
      setPostData({
        ...postData
      })
    } else {
      const {title, body} = postData;
      const data = {title, body};
      setPostData({...postData});
      const url = `http://localhost:3001/blog/posts/${params.id}`;
      
      axios.put(url, data)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      
    }
    
  }

  const createPostForm = () => (
    <form onSubmit={handleSubmit}>
      <input name='title' placeholder='enter title' value={title} onChange={handleChange}></input>
      <input name='body' placeholder='enter body' value={body} onChange={handleChange}></input>
      <button>Submit</button>
    </form>
  )
  return(
    <div>
      <div>{createPostForm()}</div>
    </div>
  )
};
export default EditPost;