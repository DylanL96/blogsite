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
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },[]);

  const allPosts = () => (
    <div>
    {posts.map(post => 
      <div className="card mb-3" key={post.id}>
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-text">{post.description}</p>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        <a href={`/posts/${post.id}`} className="btn btn-primary">Read more</a>
      </div>
      </div>
    )}
  </div>
  )

  return(
    <div>
      {allPosts()}
    </div>
  )
};

export default Home;



