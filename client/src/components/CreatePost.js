import React, {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import {postDataForm} from '../api/post';


const CreatePost = () => {
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
      // console.log(`Submitted post data: `, postData)

      postDataForm(data)
        .then(response => {
          setPostData({
            title: '',
            body: ''
          })
        })
        .catch(error => {
          console.log(error.response.data)
          setPostData({...postData})
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

export default CreatePost;