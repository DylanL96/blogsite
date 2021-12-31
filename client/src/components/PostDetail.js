import React, {useEffect, useState} from 'react';
import {isAuthenticated} from '../helpers/auth';
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom';


const PostDetail = () => {
  const [post, setPost] = useState([]); 
  const [delPost, setDelPost] = useState([]);
  let navigate = useNavigate();
  let params = useParams();
  // console.log(params.id)

  //Get all of the posts
  useEffect(() => {
    axios.get(`http://localhost:3001/blog/posts/${params.id}`)
      .then(result => {
        console.log(result.data)
        setPost(result.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [params])

  const deleteHandler = id => {
    axios.delete(`http://localhost:3001/blog/posts/${id}`)
      .then(result => {
        setDelPost(delPost.filter(element => element._id !==id));
        navigate('/');
      })
      .catch(error => {
        console.log(error)
      })
  };

  const editHandler = id => {
    navigate(`/posts/edit/${id}`)
  }
  return (
    <div>
      {isAuthenticated() && isAuthenticated().role === 1 ? <button onClick={()=>deleteHandler(post.id)} >Delete</button> : null}
      {isAuthenticated() && isAuthenticated().role === 1 ? <button onClick={()=>editHandler(post.id)} >Edit</button> : null}
    </div>
  )
};

export default PostDetail;