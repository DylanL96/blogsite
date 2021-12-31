import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
    useEffect(() => {
      axios
        .get('http://localhost:3001/blog/posts')
        .then(response => {
          setPosts(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },[])

  return(
    <div>
      {posts.map(post => 
        <div className="card mb-3" key={post.id}>
          <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        <Link className="btn btn-primary" to={`/posts/${post.id}`}>Click to read more</Link>
        </div>
        </div>
      )}
    </div>
  )
};

export default Home;
