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
    <div className="signup-form">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Enter Title</label>
        <input name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" onChange={handleChange}/>
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

export default CreatePost;

