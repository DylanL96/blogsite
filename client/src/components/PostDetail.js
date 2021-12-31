import React, {useEffect, useState} from 'react';
import {isAuthenticated} from '../helpers/auth';
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom';


const PostDetail = () => {
  const [post, setPost] = useState([]); 
  const [delPost, setDelPost] = useState([]);
  const [message, setMessage] = useState('');
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
  }, [params.id])

  const deleteHandler = id => {
    navigate('/')
    axios.delete(`http://localhost:3001/blog/posts/${id}`)
      .then(result => {
        setDelPost(delPost.filter(element => element._id !==id));
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
              Posted on {post.createdAt} by 
            </div>
            {isAuthenticated() && isAuthenticated().role === 1 ? <button onClick={()=>deleteHandler(post.id)} >Delete</button> : null}
              {isAuthenticated() && isAuthenticated().role === 1 ? <button onClick={()=>editHandler(post.id)} >Edit</button> : null}
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
        <section className="mb-5">
        <div className="card bg-light">
            <div className="card-body">
              {/* Input comment form */}
              Add a comment!
                <form className="mb-4">
                  <textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!">
                  </textarea>
                </form>         
                <div className="d-flex mb-4">
                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                    <div className="ms-3">
                        <div className="fw-bold">Commenter Name</div>
                        If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                        <div className="d-flex mt-4">
                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                            <div className="ms-3">
                                <div className="fw-bold">Commenter Name</div>
                                And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                            </div>
                        </div>
                        <div className="d-flex mt-4">
                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                            <div className="ms-3">
                                <div className="fw-bold">Commenter Name</div>
                                When you put money directly to a problem, it makes a good headline.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </section>
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

