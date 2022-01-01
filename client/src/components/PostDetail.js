import React, {useEffect, useState} from 'react';
import {isAuthenticated} from '../helpers/auth';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [post, setPost] = useState([]); 
  const [delPost, setDelPost] = useState([]);

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
  }, [params.id])

  const deleteHandler = id => {
    navigate('/')
    axios.delete(`http://localhost:3001/blog/posts/${id}`)
      .then(result => {
        setDelPost(delPost.filter(element => element._id !==id))
      })
      .catch(error => {
        console.log(error)
      })
  };

  const editHandler = id => {
    navigate(`/posts/edit/${id}`)
  };

  const createPostDetail = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-lg-8">
        <article>
          <header className="mb-4">
          <h1 className="fw-bolder mb-1">{post.title}</h1>
            <div className="fst-italic mb-2">
              Posted on {post.createdAt}
            </div>
              {isAuthenticated() && isAuthenticated().role === 1 ? <button className="btn btn-primary" onClick={()=>deleteHandler(post.id)} >Delete</button> : null}
              {isAuthenticated() && isAuthenticated().role === 1 ? <button className="btn btn-primary" onClick={()=>editHandler(post.id)} >Edit</button> : null}
          </header>
          <figure className="mb-4">
            <img
              className="img-fluid rounded"
              src="https://dummyimage.com/900x400/ced4da/6c757d.jpg"
              alt="..."
            />
          </figure>
          <section className="mb-5">
            <p className="fs-5 mb-4">
              {post.body}
            </p>
          </section>
        </article>
      </div>
    </div>
  </div>
  )
  
  return (
    <div>
      {createPostDetail()}
    </div>
  )
};

export default PostDetail;

